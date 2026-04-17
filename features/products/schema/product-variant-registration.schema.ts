import { z } from "zod";

export const productRegistrationSchema = z.object({
  productName: z.string().trim().min(1, "Product name is required."),
  productSeriesCode: z.string().trim().min(1, "Series code is required."),
  categoryName: z.string().trim().min(1, "Category is required."),
  price: z
    .number()
    .gt(0, "Price must be greater than 0.")
    .max(10_000_000, "Price is too large."),
  cost: z
    .number()
    .gt(0, "Cost must be greater than 0.")
    .max(10_000_000, "Cost is too large."),
});

export const variantRegistrationSchema = z.object({
  color: z.string().trim().min(1, "Color is required."),
  size: z.string().trim().min(1, "Size is required."),
  gender: z.string().trim().min(1, "Gender is required."),
  stock: z.number().int().min(0, "Stock must be 0 or more."),
  imageFile: z.custom<File>((value) => value instanceof File, {
    message: "Variant image is required.",
  }),
});

export type ProductRegistrationValues = z.infer<
  typeof productRegistrationSchema
>;
export type VariantRegistrationValues = z.infer<
  typeof variantRegistrationSchema
>;
