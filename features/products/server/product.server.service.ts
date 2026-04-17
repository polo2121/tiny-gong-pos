import { ok, err, Result } from "neverthrow";
import { AppError } from "@/lib/error";
import { productRepo } from "@/features/products/repositories/product.repository";
import { InventoryMetrics } from "@/features/products/types/product.types";
import {
  SearchProductsInput,
  SearchProductsCursor,
  ProductCards,
} from "@/features/products/schema/product-search.schema";
import { buildProductCards } from "@/features/products/utils/build-products-by-category";
import { UpdateVariantInput } from "../schema/variant-form.schema";
import { dummyLog } from "../utils/dummy-log";

async function getInventoryMetrics(): Promise<
  Result<InventoryMetrics, AppError>
> {
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

type SearchProductParams = SearchProductsInput;
async function searchProducts({
  query,
  searchBy,
  cursor,
  limit,
}: SearchProductParams): Promise<
  Result<
    {
      productCards: ProductCards[];
      nextCursor: SearchProductsCursor;
    },
    AppError
  >
> {
  const result = await productRepo.searchProductsQuery({
    query,
    searchBy,
    cursor,
    limit,
  });

  if (result.isErr()) {
    return err(result.error);
  }

  const data = result.value;

  const productCards = buildProductCards(data.items);
  console.log("productCards", productCards);

  return ok({
    productCards,
    nextCursor: data.nextCursor,
  });
}

async function updateVariant(
  variantData: UpdateVariantInput & { imageFile: File },
): Promise<Result<{ variantId: string }, AppError>> {
  const existingImagePath = await productRepo.getVariantImagePathQuery(
    variantData.id,
  );
  if (existingImagePath.isErr()) {
    return err(existingImagePath.error);
  }
  const prevImagePath = existingImagePath.value;

  const uploadResult = await productRepo.uploadVariantImageQuery(
    variantData.id,
    variantData.imageFile,
  );

  if (uploadResult.isErr()) {
    return err(uploadResult.error);
  }

  const imagePath = uploadResult.value;

  const updateResult = await productRepo.updateVariantQuery({
    ...variantData,
    imagePath,
  });

  if (updateResult.isErr()) {
    await productRepo.deleteVariantImageQuery(imagePath);
    return err(updateResult.error);
  }

  if (prevImagePath) {
    await productRepo.deleteVariantImageQuery(prevImagePath);
  }

  return ok({
    variantId: updateResult.value,
  });
}

export const productService = {
  getInventoryMetrics,
  searchProducts,
  updateVariant,
};
