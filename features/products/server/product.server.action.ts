"use server";
import {
  ProductSearchPage,
  productSearchSchema,
  ProductSearch,
} from "@/features/products/schema/product-search.schema";
import { searchProductsService } from "@/features/products/server/product.server.service";
import { ActionResult } from "@/features/products/schema/product.schema";
import { z } from "zod";

export async function searchProductsAction(
  productSearchPayload: ProductSearch,
): Promise<ActionResult<ProductSearchPage>> {
  const validatedPayload = productSearchSchema.safeParse(productSearchPayload);

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

  const result = await searchProductsService(validatedPayload.data);

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
