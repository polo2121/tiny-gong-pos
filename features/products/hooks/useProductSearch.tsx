"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { searchProductsAction } from "@/features/products/server/product.server.action";
import { SearchProductsInput } from "@/features/products/schema/product-search.schema";

type ProductSearchParams = Omit<SearchProductsInput, "cursor">;
const useProductSearch = (productSearchParams: ProductSearchParams) => {
  const query = useInfiniteQuery({
    queryKey: ["product-search", productSearchParams],
    initialPageParam: null as SearchProductsInput["cursor"],
    queryFn: ({ pageParam }: { pageParam: SearchProductsInput["cursor"] }) =>
      searchProductsAction({
        ...productSearchParams,
        cursor: pageParam,
      }),
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof searchProductsAction>>,
    ) => {
      if (!lastPage.success) {
        return undefined;
      }
      return lastPage.data.nextCursor ?? undefined;
    },
  });

  const pages = query.data?.pages ?? [];

  const productCards = pages
    .filter((page) => page.success)
    .flatMap((page) => page.data.productCards);

  const failedPage = pages.find((page) => page.success === false);
  const actionError = failedPage ? failedPage.error : null;

  return {
    ...query,
    productCards,
    actionError,
  };
};

export default useProductSearch;
