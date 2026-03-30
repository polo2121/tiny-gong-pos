"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductSearch } from "@/features/products/schema/product-search.schema";
import { productApi } from "@/features/products/api/product-api";

const useProductSearch = (
  productSearchParams: Omit<ProductSearch, "cursor">,
) => {
  const query = useInfiniteQuery({
    queryKey: ["product-search", productSearchParams],
    initialPageParam: null as ProductSearch["cursor"],
    queryFn: ({ pageParam }: { pageParam: ProductSearch["cursor"] }) =>
      productApi.productSearch({
        ...productSearchParams,
        cursor: pageParam,
      }),
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof productApi.productSearch>>,
    ) => {
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

  return {
    ...query,
    items,
    actionError,
  };
};

export default useProductSearch;
