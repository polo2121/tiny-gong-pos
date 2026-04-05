import { ProductSearchResultPage } from "@/features/products/schema/product-search.schema";

type FlatItems = ProductSearchResultPage["items"][number];
type CategoryItem = {
  categoryId: string;
  categoryPrefix: string;
  categoryName: string;
  products: {
    productId: string;
    productName: string;
    productSeriesCode: string;
    colors: string[];
    sizes: string[];
    genders: string[];
  }[];
};

export function buildProductsByCategory(flatItems: FlatItems[] = []) {
  if (!flatItems.length) return [];

  const categoryMap = new Map<string, CategoryItem>();

  for (const { product, color, size, gender } of flatItems) {
    const categoryId = product.category.categoryId;

    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, {
        categoryId,
        categoryPrefix: product.category.prefix,
        categoryName: product.category.categoryName,
        products: [],
      });
    }

    const category = categoryMap.get(categoryId)!;
    let productCard = category.products.find(
      (p) => p.productId === product.productId,
    );

    if (!productCard) {
      productCard = {
        productId: product.productId,
        productName: product.productName,
        productSeriesCode: product.seriesCode,
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
  return Array.from(categoryMap.values());
}
