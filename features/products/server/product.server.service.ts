import {
  getInventoryMetricsQuery,
  productSearchQuery,
} from "@/features/products/repositories/product.repository";
import { InventoryMetrics } from "@/features/products/types/product.types";
import {
  ProductSearch,
  ProductSearchPage,
} from "@/features/products/schema/product-search.schema";
import { ok, err, Result } from "neverthrow";
import { AppError, normalizeError } from "@/lib/error";

export async function getInventoryMetrics(): Promise<
  Result<InventoryMetrics, AppError>
> {
  const result = await getInventoryMetricsQuery();

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

export async function searchProductsService(
  filters: ProductSearch,
): Promise<Result<ProductSearchPage, AppError>> {
  const result = await productSearchQuery(filters);

  if (result.isErr()) {
    return err(result.error);
  }

  const data = result.value;
  const categoryMap = new Map<string, ProductSearchPage["items"][number]>();

  for (const { product, color, size, gender } of data.items) {
    if (!categoryMap.has(product.category.id)) {
      categoryMap.set(product.category.id, {
        categoryId: product.category.id,
        categoryPrefix: product.category.prefix,
        categoryName: product.category.name,
        products: [],
      });
    }

    const category = categoryMap.get(product.category.id)!;
    let productCard = category.products.find((p) => p.productId === product.id);

    if (!productCard) {
      productCard = {
        productId: product.id,
        productName: product.name,
        productSeriesCode: product.series_code,
        colors: [],
        sizes: [],
        genders: [],
      };
      category.products.push(productCard);
    }

    if (!productCard.colors.includes(color)) productCard.colors.push(color);
    if (!productCard.sizes.includes(size)) productCard.sizes.push(size);
    if (!productCard.genders.includes(gender)) productCard.genders.push(gender);
  }

  return ok({
    items: Array.from(categoryMap.values()),
    nextCursor: data.nextCursor,
  });
}
