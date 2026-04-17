import { z } from "zod";

export const uuidSchema = z.uuid("Invalid UUID.");

export const variantFormSchema = z.object({
  color: z.string().trim().min(1, "Color is required."),
  size: z.string().trim().min(1, "Size is required."),
  gender: z.string().trim().min(1, "Gender is required."),
  stock: z.number().int().min(0, "Stock must be 0 or more."),
});

export const updateVariantInputSchema = variantFormSchema.extend({
  id: uuidSchema,
});

export type VariantFormValues = z.infer<typeof variantFormSchema>;
export type UpdateVariantInput = z.infer<typeof updateVariantInputSchema>;
