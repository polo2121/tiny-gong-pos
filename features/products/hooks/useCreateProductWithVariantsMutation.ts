// hooks/useCreateProductWithVariantsMutation.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { ProductRegistrationValues, VariantRegistrationValues } from "../schema/product-variant-registration.schema";
// import { productApi } from "@/features/products/api/product-api";

type FinalPayload = {
  product: ProductRegistrationValues;
  variants: VariantRegistrationValues[];
};

const useCreateProductWithVariantsMutation = () => {
  return useMutation({
    mutationFn: (payload: FinalPayload) =>
    //   productApi.createProductWithVariants(payload),
        new Promise((resolve) => { 
          // Simulate an API call
          setTimeout(() => {
            resolve({ success: true });
          }, 10000);
        })
    
  });
};

export default useCreateProductWithVariantsMutation;
