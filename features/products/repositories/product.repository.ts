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

    const { data, error } = await supabase.rpc("search_products_with_cursor_pagination", {
      p_query: query?.trim() ?? "",
      p_search_by: searchBy,
      p_limit: limit,
      p_cursor_id: cursor?.id ?? null,
      p_cursor_created_at: cursor?.createdAt ?? null,
    });

    if (error) {
      return err(
        new AppError("Failed to search products.", {
          code: "DATABASE_ERROR",
          context: "products.searchProductsQuery",
          cause: error,
          details: { code: error.code, details: error.details, hint: error.hint },
        }),
      );
    }

    const validated = z.array(searchProductsResultRowSchema).safeParse(data ?? []);
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

  }
  catch(error) {
    return err(normalizeError(error));
  }

}
export const productRepo = {
  getInventoryMetrics,
  searchProductsQuery,
};


