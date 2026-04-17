export type InventoryMetrics = {
      totalProducts: number,
      totalInStock: number,
      totalOutOfStock: number,
      totalCost: number,
};

export type MetricCardItem = {
  title: string;
  subtitle: string;
  number: number;
  unit: "MMK" | "Item(s)";
};


export type ProductDetails = {
  productId: string;
  productName: string;
  productSeriesCode: string;
  categoryName: string;
  price: number;
  cost: number;
  variantItems: ProductVariantItem[];
};

export type ProductVariantItem = {
  variantId: string;
  imageUrl?: string | null;
  imagePath?: string | null;
  color: string;
  size: string;
  gender: string;
  stock: number;
};

