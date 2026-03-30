import { z } from "zod";

// --- cursor ---

export const productSearchCursorSchema = z.object({
  id:        z.string().uuid(),
  createdAt: z.string().datetime(),
}).nullable().default(null);

// --- payload (what the client sends) ---

export const productSearchSchema = z.object({
  query:    z.string().trim().default(""),
  searchBy: z.enum(["name", "gender", "color", "size"]),
  cursor:   productSearchCursorSchema,
  limit:    z.coerce.number().int().min(1).max(100).default(50),
});

// --- database (raw rows from Supabase) ---

export const productSearchRepositoryRowSchema = z.object({
  id:         z.string().uuid(),
  gender:     z.string(),
  color:      z.string(),
  size:       z.string(),
  created_at: z.string(),
  product: z.object({
    id:          z.string().uuid(),
    name:        z.string(),
    series_code: z.string(),
    category: z.object({
      id:     z.string().uuid(),
      prefix: z.string(),
      name:   z.string(),
    }),
  }),
});

export const productSearchRepositoryResultSchema = z.object({
  items:      z.array(productSearchRepositoryRowSchema),
  nextCursor: productSearchCursorSchema.nullable(),
});

// --- service (grouped shape for UI) ---

export const productSearchPageSchema = z.object({
  nextCursor: productSearchCursorSchema.nullable(),
  items: z.array(z.object({
    categoryId:     z.string().uuid(),
    categoryPrefix: z.string(),
    categoryName:   z.string(),
    products: z.array(z.object({
      productId:         z.string().uuid(),
      productName:       z.string(),
      productSeriesCode: z.string(),
      colors:  z.array(z.string()),
      sizes:   z.array(z.string()),
      genders: z.array(z.string()),
    })),
  })),
});

// --- types ---

export type ProductSearchCursor           = z.infer<typeof productSearchCursorSchema>;
export type ProductSearch                 = z.infer<typeof productSearchSchema>;
export type ProductSearchRepositoryRow    = z.infer<typeof productSearchRepositoryRowSchema>;
export type ProductSearchRepositoryResult = z.infer<typeof productSearchRepositoryResultSchema>;
export type ProductSearchPage             = z.infer<typeof productSearchPageSchema>;
export type ProductSearchCategory         = ProductSearchPage["items"][number];
