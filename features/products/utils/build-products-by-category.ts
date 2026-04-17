import { SearchProductsResultRow,ProductCards } from "@/features/products/schema/product-search.schema";


export function buildProductCards(flatItems : SearchProductsResultRow[]) {

  if(!flatItems.length)
    return [];

  const productsById = new Map<string, ProductCards>();

  for (const item of flatItems) {
    if (!productsById.has(item.product_id)) {
      productsById.set(item.product_id, {
        productId: item.product_id,
        productName: item.product_name,
        productSeriesCode: item.product_series_code,
        colors: [],
        sizes: [],
        category: {
          categoryId: item.category_id,
          categoryName: item.category_name,
          prefix: item.category_prefix,
        },
      });
    }

    const product = productsById.get(item.product_id)!;

    if (!product.colors.includes(item.color)) {
      product.colors.push(item.color);
    }

    if (!product.sizes.includes(item.size)) {
      product.sizes.push(item.size);
    }
  }

  return Array.from(productsById.values());
}
