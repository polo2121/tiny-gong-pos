"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filters } from "@/features/products/schema/product-search.schema";
import { productApi } from "@/features/products/api/product-api";
import { buildProductsByCategory } from "@/features/products/utils/build-products-by-category";

const useProductSearch = (
  productSearchParams: Omit<Filters, "cursor">,
) => {
  const query = useInfiniteQuery({
    queryKey: ["product-search", productSearchParams],
    initialPageParam: null as Filters["cursor"],
    queryFn: ({ pageParam }: { pageParam: Filters["cursor"] }) =>
      productApi.search({
        ...productSearchParams,
        cursor: pageParam,
      }),
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof productApi.search>>,
    ) => {
      console.log(lastPage)
      if (!lastPage.success) return undefined;
      return lastPage.data.nextCursor ?? undefined;
    },
  });


  const pages = query.data?.pages ?? [];

  const items = pages
    .filter((page) => page.success)
    .flatMap((page) => page.data.items);

  const failedPage = pages.find((page) => page.success === false);
  const actionError = failedPage ? failedPage.error : null;

  
  const groupedCategory = buildProductsByCategory(items);


  return {
    ...query,
    groupedCategory,
    actionError,

  };
};

export default useProductSearch;
