"use server";
import {
  ProductSearchResultPage,
  filtersSchema,
  Filters,
} from "@/features/products/schema/product-search.schema";
import { productService } from "@/features/products/server/product.server.service";
import { ActionResult } from "@/features/products/schema/product.schema";

export async function searchProductsAction(
  payload: Filters,
): Promise<ActionResult<ProductSearchResultPage>> {

  const validatedPayload = filtersSchema.safeParse(payload);

  if (!validatedPayload.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        userMsg: "Please check your input.",
        details: validatedPayload.error.issues
      },
    };
  }

  const result = await productService.search(validatedPayload.data);

  if (result.isErr()) {
    return {
      success: false,
      error: {
        code: result.error.code,
        userMsg: result.error.userMsg,
        details: result.error.details,
      },
    };
  }
  return {
    success: true,
    data: result.value,
  };
}
