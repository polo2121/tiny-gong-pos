"use client";

import { useState } from "react";
import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useProductSearch from "@/features/products/hooks/useProductSearch";
import { Card, CardContent } from "@/components/ui/card";
import { useDebounce } from "@/hooks/useDebounce";
import ProductCard from "@/features/products/components/cards/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/skeleton-card";

const ProductInStockSection = () => {
  const [searchBy, setSearchBy] = useState<
    "name" | "gender" | "color" | "size"
  >("name");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);

  const {
    items,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    actionError,
  } = useProductSearch({
    query: debouncedSearch,
    searchBy,
    limit: 50,
  });

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-red-500">
          Something went wrong while loading products.
        </CardContent>
      </Card>
    );
  }

  const productsByCategory = items;

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <DualText
          primary="Products In Stock"
          secondary="လက်ကျန်ကုန်ပစ္စည်းများ"
          size="lg"
        />
        <Button>Add Product</Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Select
          value={searchBy}
          onValueChange={(value) => setSearchBy(value ?? "name")}
        >
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="gender">Gender</SelectItem>
            <SelectItem value="color">Color</SelectItem>
            <SelectItem value="size">Size</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`Search by ${searchBy}...`}
          className="flex-1"
        />
      </div>

      {actionError ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-sm text-red-600">
            {actionError.userMsg}
          </CardContent>
        </Card>
      ) : null}

      {isLoading &&
        Array.from({ length: 5 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}

      {!productsByCategory.length && !isLoading && (
        <Card>
          <CardContent className="p-6 text-sm text-slate-500">
            No products found.
          </CardContent>
        </Card>
      )}

      {productsByCategory.length > 0 && (
        <div className="space-y-8">
          {productsByCategory.map((category) => (
            <section key={category.categoryId} className="space-y-4">
              <DualText
                primary={category.categoryName}
                secondary={category.categoryPrefix}
                size="md"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.productId}
                    productName={product.productName}
                    seriesCode={product.productSeriesCode}
                    colors={product.colors}
                    sizes={product.sizes}
                    genders={product.genders}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {hasNextPage ? (
        <div className="flex justify-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </Button>
        </div>
      ) : null}
    </section>
  );
};

export default ProductInStockSection;
