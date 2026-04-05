import { z } from "zod";

// --- cursor ---

export const searchProductsCursorSchema = z.object({
  id:        z.uuid(),
  createdAt: z.string(),
}).nullable().default(null);

// --- payload (what the client sends) ---

export const searchProductsInputSchema = z.object({
  query:    z.string().trim().default(""),
  searchBy: z.enum(["name", "gender", "color", "size"]),
  cursor:   searchProductsCursorSchema,
  limit:    z.coerce.number().int().min(1).max(100).default(50),
});

// --- database (raw rows from Supabase) ---

export const searchProductsResultRowSchema = z.object({
  variant_id: z.uuid(),
  variant_created_at: z.string(),
  gender: z.string(),
  color: z.string(),
  size: z.string(),
  product_id: z.string().uuid(),
  product_name: z.string(),
  product_series_code: z.string(),
  category_id: z.uuid(),
  category_prefix: z.string(),
  category_name: z.string(),
  next_cursor_id: z.string().uuid().nullable(),
  next_cursor_created_at: z.string().nullable(),
});

export type SearchProductsResultRow = z.infer<typeof searchProductsResultRowSchema>;


// export const productSearchRepositoryResultSchema = z.object({
//   items:      z.array(productSearchRepositoryRowSchema),
//   nextCursor: searchProductsCursorSchema.nullable(),
// });

// --- service (grouped shape for UI) ---



// --- types ---

export type SearchProductsCursor           = z.infer<typeof searchProductsCursorSchema>;
export type SearchProductsInput = z.infer<typeof searchProductsInputSchema>
// export type ProductSearchRepositoryRow    = z.infer<typeof productSearchRepositoryRowSchema>;
// export type ProductSearchRepositoryResult = z.infer<typeof productSearchRepositoryResultSchema>;
// export type ProductSearchCategory         = ProductSearchResultPage["items"][number];
