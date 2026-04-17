import { createClient } from "@/lib/supabase/server";
import { AppError, normalizeError } from "@/lib/error";
import { z } from "zod";
import { ok, err, Result } from "neverthrow";
import {
  inventoryMetricsRecordSchema,
  InventoryMetricsRecord,
} from "@/features/products/schema/product.schema";
import {
  SearchProductsInput,
  searchProductsResultRowSchema,
} from "@/features/products/schema/product-search.schema";
import { UpdateVariantInput } from "../schema/variant-form.schema";
import { dummyLog } from "../utils/dummy-log";

async function getInventoryMetrics(): Promise<
  Result<InventoryMetricsRecord, AppError>
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_inventory_metrics");

    if (error) {
      return err(
        new AppError("Failed to load inventory metrics.", {
          code: "DATABASE_ERROR",
          userMsg: "Unable to load inventory metrics right now.",
          context: "products.getInventoryMetricsQuery",
          cause: error,
          details: {
            code: error.code,
            details: error.details,
            hint: error.hint,
          },
        }),
      );
    }

    const validated = inventoryMetricsRecordSchema.safeParse(data);
    if (!validated.success) {
      return err(
        new AppError("Invalid inventory metrics data.", {
          code: "DATABASE_ERROR",
          userMsg: "Unable to load inventory metrics right now.",
          context: "products.getInventoryMetricsQuery.validation",
          cause: validated.error,
          details: z.flattenError(validated.error),
        }),
      );
    }

    return ok(validated.data);
  } catch (error) {
    return err(normalizeError(error));
  }
}

type SearchProductParams = SearchProductsInput;

async function searchProductsQuery({
  query,
  searchBy,
  cursor,
  limit,
}: SearchProductParams) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc(
      "search_products_with_cursor_pagination",
      {
        p_query: query?.trim() ?? "",
        p_search_by: searchBy,
        p_limit: limit,
        p_cursor_id: cursor?.id ?? null,
        p_cursor_created_at: cursor?.createdAt ?? null,
      },
    );

    if (error) {
      return err(
        new AppError("Failed to search products.", {
          code: "DATABASE_ERROR",
          context: "products.searchProductsQuery",
          cause: error,
          details: {
            code: error.code,
            details: error.details,
            hint: error.hint,
          },
        }),
      );
    }

    const validated = z
      .array(searchProductsResultRowSchema)
      .safeParse(data ?? []);
    if (!validated.success) {
      return err(
        new AppError("Invalid product search data.", {
          code: "DATABASE_ERROR",
          context: "products.searchProductsQuery.validation",
          cause: validated.error,
          details: z.flattenError(validated.error),
        }),
      );
    }

    const ResultRows = validated.data;
    const firstRow = ResultRows[0];
    const hasNextCursor = Boolean(
      firstRow?.next_cursor_id && firstRow?.next_cursor_created_at,
    );

    const nextCursor = hasNextCursor
      ? {
          id: firstRow.next_cursor_id!,
          createdAt: firstRow.next_cursor_created_at!,
        }
      : null;

    return ok({
      items: ResultRows,
      nextCursor,
    });
  } catch (error) {
    return err(normalizeError(error));
  }
}

async function updateVariantQuery(
  variantData: UpdateVariantInput & { imagePath: string },
) {
  try {
    dummyLog.show("Updating variant with data:", variantData, "back");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product_variants")
      .update({
        color: variantData.color,
        size: variantData.size,
        gender: variantData.gender,
        stock_qty: variantData.stock,
        image_url: variantData.imagePath,
      })
      .eq("id", variantData.id)
      .select("id")
      .single();

    if (!data?.id) {
      return err(
        new AppError("Variant not found.", {
          code: "NOT_FOUND",
          userMsg: "Variant not found.",
          context: "products.updateVariantQuery.notFound",
          details: { variantId: variantData.id },
        }),
      );
    }

    if (error) {
      console.error("Failed to update variant row:", {
        variantId: variantData.id,
        imagePath: variantData.imagePath,
      });
      return err(
        new AppError("Failed to update variant.", {
          code: "DATABASE_ERROR",
          userMsg: "Unable to update variant right now.",
          context: "products.updateVariantQuery",
          cause: error,
          details: {
            variantId: variantData.id,
          },
        }),
      );
    }

    return ok(data.id);
  } catch (error) {
    return err(normalizeError(error));
  }
}
async function getVariantImagePathQuery(variantId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("product_variants")
      .select("image_url")
      .eq("id", variantId)
      .maybeSingle();

    if (error) {
      return err(
        new AppError("Failed to load variant image path.", {
          code: "DATABASE_ERROR",
          userMsg: "Unable to load variant image right now.",
          context: "products.getVariantImagePathQuery",
          cause: error,
          details: {
            variantId,
            message: error.message,
          },
        }),
      );
    }

    if (!data) {
      return err(
        new AppError("Variant not found.", {
          code: "NOT_FOUND",
          userMsg: "Variant not found.",
          context: "products.getVariantImagePathQuery.notFound",
          details: {
            variantId,
          },
        }),
      );
    }

    return ok(data.image_url ?? null);
  } catch (error) {
    return err(normalizeError(error));
  }
}

async function uploadVariantImageQuery(variantId: string, imageFile: File) {
  try {
    const supabase = await createClient();
    const bucketName =
      process.env.NEXT_PUBLIC_SUPABASE_VARIANT_IMAGES_BUCKET ??
      "variant-images";

    const fileExtension = imageFile.name.split(".").pop() ?? "jpg";
    const filePath = `private/${variantId}/${crypto.randomUUID()}.${fileExtension}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.log("Failed to upload image to Supabase Storage:");
      return err(
        new AppError("Failed to upload variant image.", {
          code: "DATABASE_ERROR",
          userMsg: "Unable to upload variant image right now.",
          context: "products.uploadVariantImage",
          cause: error,
          details: {
            bucketName,
            filePath,
            message: error.message,
          },
        }),
      );
    }

    return ok(filePath);
  } catch (error) {
    return err(normalizeError(error));
  }
}

async function deleteVariantImageQuery(imagePath: string) {
  try {
    const supabase = await createClient();
    const bucketName =
      process.env.NEXT_PUBLIC_SUPABASE_VARIANT_IMAGES_BUCKET ??
      "variant-images";

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([imagePath]);

    if (error) {
      console.error("Failed to delete variant image from Supabase Storage:", {
        bucketName,
        imagePath,
        message: error.message,
      });

      return err(
        new AppError("Failed to delete variant image.", {
          code: "DATABASE_ERROR",
          userMsg: "Unable to clean up uploaded image.",
          context: "products.deleteVariantImageQuery",
          cause: error,
          details: {
            bucketName,
            imagePath,
            message: error.message,
          },
        }),
      );
    }

    return ok(null);
  } catch (error) {
    return err(normalizeError(error));
  }
}

export const productRepo = {
  getInventoryMetrics,
  searchProductsQuery,
  updateVariantQuery,
  getVariantImagePathQuery,
  uploadVariantImageQuery,
  deleteVariantImageQuery,
};
