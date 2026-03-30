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
