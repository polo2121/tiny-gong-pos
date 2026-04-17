"use client";

import { useMutation } from "@tanstack/react-query";
import { productApi } from "@/features/products/api/product-api";

const useUpdateVariantMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => productApi.updateVariant(formData),
  });
};

export default useUpdateVariantMutation;
