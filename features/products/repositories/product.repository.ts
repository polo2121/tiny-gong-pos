import { createClient } from "@/lib/supabase/server";
import { AppError, normalizeError } from "@/lib/error";
import { z } from "zod";
import { ok, err, Result } from "neverthrow";
import {
  inventoryMetricsRecordSchema,
  InventoryMetricsRecord,
} from "@/features/products/schema/product.schema";
import {
  ProductSearch,
  productSearchRepositoryRowSchema,
  ProductSearchRepositoryResult,
} from "@/features/products/schema/product-search.schema";

export async function getInventoryMetricsQuery(): Promise<
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

export async function productSearchQuery({
  query,
  searchBy,
  cursor,
  limit,
}: ProductSearch): Promise<Result<ProductSearchRepositoryResult, AppError>> {
  try {
    const supabase = await createClient();
    const normalizedQuery = query.trim();

    let dbQuery = supabase
      .from("product_variants")
      .select(
        `
        id,
        gender,
        color,
        size,
        created_at,
        product:products!inner(
          id,
          name,
          series_code,
          category:categories!inner(
            id,
            prefix,
            name
          )
        )
        `,
      )
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(limit + 1);

    if (cursor) {
      dbQuery = dbQuery.or(
        `created_at.lt.${cursor.createdAt},and(created_at.eq.${cursor.createdAt},id.lt.${cursor.id})`,
      );
    }

    if (normalizedQuery) {
      switch (searchBy) {
        case "name": {
          dbQuery = dbQuery.or(`name.ilike.%${normalizedQuery}%`, {
            referencedTable: "product",
          });
          break;
        }

        case "gender": {
          dbQuery = dbQuery.eq("gender", normalizedQuery);
          break;
        }

        case "color": {
          dbQuery = dbQuery.eq("color", normalizedQuery);
          break;
        }

        case "size": {
          dbQuery = dbQuery.eq("size", normalizedQuery);
          break;
        }
      }
    }

    const { data, error } = await dbQuery;

    if (error) {
      return err(
        new AppError("Failed to search products.", {
          code: "DATABASE_ERROR",
          context: "products.productSearchQuery",
          cause: error,
          details: {
            code: error.code,
            details: error.details,
            hint: error.hint,
            query: normalizedQuery,
            searchBy,
          },
        }),
      );
    }

    const validated = z.array(productSearchRepositoryRowSchema).safeParse(
      data ?? [],
    );

    if (!validated.success) {
      return err(
        new AppError("Invalid product search data.", {
          code: "DATABASE_ERROR",
          context: "products.productSearchQuery.validation",
          cause: validated.error,
          details: z.flattenError(validated.error),
        }),
      );
    }

    const hasMore = validated.data.length > limit;
    const items = hasMore ? validated.data.slice(0, limit) : validated.data;
    const lastItem = items.at(-1);

    return ok({
      items,
      nextCursor:
        hasMore && lastItem
          ? {
              id: lastItem.id,
              createdAt: lastItem.created_at,
            }
          : null,
    });
  } catch (error) {
    return err(normalizeError(error));
  }
}
