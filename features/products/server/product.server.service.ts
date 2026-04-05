import { ok, err, Result } from "neverthrow";
import { AppError } from "@/lib/error";
import { productRepo } from "@/features/products/repositories/product.repository";
import { InventoryMetrics } from "@/features/products/types/product.types";
import {

} from "@/features/products/schema/product-search.schema";

async function getInventoryMetrics(): Promise<Result<InventoryMetrics, AppError>> {
  const result = await productRepo.getInventoryMetrics();

  if (result.isErr()) {
    return err(result.error);
  }

  const data = result.value;

  return ok({
    totalProducts: data.total_products,
    totalInStock: data.total_in_stock,
    totalOutOfStock: data.total_out_of_stock,
    totalCost: data.total_cost,
  });
}



export const productService = {
  getInventoryMetrics,
};

