"use client";

import React, { useState } from "react";
import z from "zod";
import { Button } from "@/components/ui/button";
import ProductCreateForm from "../product/ProductCreateForm";
import {
  productRegistrationSchema,
  ProductRegistrationValues,
} from "@/features/products/schema/product-variant-registration.schema";
import { variantRegistrationSchema } from "../../schema/product-variant-registration.schema";
import { Card, CardContent } from "@/components/ui/card";
import VariantRegistrationSection from "./VariantRegistrationSection";
import { useProductRegistrationFormStore } from "@/features/products/stores/useProductRegistrationFormStore";
import useCreateProductWithVariantsMutation from "@/features/products/hooks/useCreateProductWithVariantsMutation";
import { toast } from "sonner";

const ProductRegistrationSection = () => {
  const {
    productFormMode,
    setProductFormMode,
    savedProductDraft,
    savedVariantDraft,
    createProductDraft,
    removeProductDraft,
    clearAllDraft,
  } = useProductRegistrationFormStore();

  const createMutation = useCreateProductWithVariantsMutation();

  const handleSaveProductDraft = (values: ProductRegistrationValues) => {
    if (createMutation.isPending)
      return toast.warning(
        "Please wait, your previous submission is still being processed.",
      );
    createProductDraft(values);
  };

  const submitProductWithVariants = () => {
    if (createMutation.isPending)
      return toast.warning(
        "Please wait, your previous submission is still being processed.",
      );

    if (!hasProductDraft) {
      toast.error("Please create and save product first.");
      return;
    }

    if (!hasVariantDraft) {
      toast.error("Please add at least one variant.");
      return;
    }

    createMutation.mutate(
      {
        product: savedProductDraft!,
        variants: Object.values(savedVariantDraft),
      },
      {
        onSuccess: () => {
          toast.success("Saved successfully.");
          clearAllDraft();
        },
        onError: (error: unknown) => {},
      },
    );
  };

  const hasProductDraft =
    productRegistrationSchema.safeParse(savedProductDraft).success;

  const hasVariantDraft = z
    .array(variantRegistrationSchema)
    .min(1)
    .safeParse(Object.values(savedVariantDraft)).success;

  return (
    <section>
      <div className="">
        {/* Btn - to open Product Form */}
        {productFormMode === "close" && !savedProductDraft && (
          <Button
            className="flex flex-col items-start gap-1 rounded-lg "
            onClick={() => setProductFormMode("create")}
          >
            <span className="font-bold text-lg">Create Product</span>
            <span className="text-xs text-slate-500">
              (ဒီနေ့ product အရရောင်းရဆုံးစာရင်း)
            </span>
          </Button>
        )}
        {/* Product Create Form  */}
        {productFormMode === "create" && !savedProductDraft && (
          <ProductCreateForm
            mode="create"
            onSubmit={handleSaveProductDraft}
            onCancel={() => setProductFormMode("close")}
          />
        )}
        {/* Summary - Saved Product Draft Summary */}
        {productFormMode === "close" && hasProductDraft && (
          <>
            <Card className="background-transparent border-none shadow-none p-0 ring-0 rounded-none">
              <CardContent className="flex justify-between lg:flex-row lg:items-start lg:justify-between px-0 background-transparent">
                <div className="">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                    {savedProductDraft?.productSeriesCode}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {savedProductDraft?.productName}
                  </p>
                </div>

                <div className="">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                    Price
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {savedProductDraft?.price}
                  </p>
                </div>

                <div className="">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                    Cost
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {savedProductDraft?.cost}
                  </p>
                </div>
              </CardContent>
              <Button onClick={() => setProductFormMode("edit")}>EDIT</Button>
            </Card>
            <VariantRegistrationSection />
          </>
        )}
        {/* Edit Form -Product Edit Form */}
        {productFormMode === "edit" && savedProductDraft && (
          <ProductCreateForm
            mode="edit"
            existingValues={savedProductDraft}
            onSubmit={handleSaveProductDraft}
            onCancel={() => setProductFormMode("close")}
          />
        )}

        {/* Submit Button */}
        {hasProductDraft && hasVariantDraft && (
          <Button
            className="mt-4 bg-green-500 text-white"
            onClick={() => {
              submitProductWithVariants();
            }}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending
              ? "Saving Registration"
              : "    Register Product with Variants"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default ProductRegistrationSection;
