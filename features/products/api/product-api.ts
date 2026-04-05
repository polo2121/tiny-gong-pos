"use client";
import { searchProductsAction } from "@/features/products/server/product.server.action";
import { ProductSearch } from "@/features/products/schema/product-search.schema";

async function search(productSearchPayload: ProductSearch) {
  return await searchProductsAction(productSearchPayload);
}

export const productApi = {
  search,
};
