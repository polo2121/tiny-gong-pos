"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DualText from "@/components/DualText";
import VariantField from "@/features/products/components/variants/VariantField";
import VariantImageUpload from "@/features/products/components/variants/VariantImageUpload";
import {
  variantFormSchema,
  VariantFormValues,
} from "@/features/products/schema/variant-form.schema";
import { ProductVariantItem } from "@/features/products/types/product.types";
import useUpdateVariantMutation from "../../hooks/useUpdateVariantMutation";
import { toast } from "sonner";

type EditVariantDrawerProps = {
  selectedVariant: ProductVariantItem;
  onClose: () => void;
};

const EditVariantDrawer = ({
  selectedVariant,
  onClose,
}: EditVariantDrawerProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    selectedVariant.imageUrl ?? null,
  );

  const variantForm = useForm<VariantFormValues>({
    resolver: zodResolver(variantFormSchema),
    defaultValues: {
      color: selectedVariant.color,
      size: selectedVariant.size,
      gender: selectedVariant.gender,
      stock: selectedVariant.stock,
    },
  });
  const updateVariantMutation = useUpdateVariantMutation();

  const handleImageChange = (selectedNewImage: File | null) => {
    if (imagePreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    if (!selectedNewImage) {
      setImageFile(null);
      setImagePreviewUrl(selectedVariant.imageUrl ?? null);
      return;
    }

    setImageFile(selectedNewImage);
    setImagePreviewUrl(URL.createObjectURL(selectedNewImage));
  };

  const submitVariantValues = (values: VariantFormValues) => {
    console.log("button clicked");

    // safe guard to prevent multiple submissions while the mutation is still pending
    if (updateVariantMutation.isPending) return;

    const formData = new FormData();
    formData.append("id", selectedVariant.variantId);
    formData.append("color", values.color);
    formData.append("size", values.size);
    formData.append("gender", values.gender);
    formData.append("stock", String(values.stock));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    updateVariantMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Variant updated successfully.");
        onClose();
      },
      onError: (error: any) => {
        toast.error(
          error.userMsg ??
            "Failed to update variant. Please check your input and try again.",
        );

        if (Array.isArray(error?.details)) {
          for (const issue of error.details) {
            const fieldName = issue.path?.[0];

            if (typeof fieldName === "string") {
              variantForm.setError(fieldName as keyof VariantFormValues, {
                message: issue.message,
              });
            }
          }
        }
      },
    });
  };

  return (
    <div className="fixed inset-0 z-20 flex items-end bg-slate-950/25">
      <div className="flex h-10/12 w-full flex-col rounded-t-3xl border-t border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-5">
          <DualText
            primary="Edit Variant"
            secondary="အမျိုးအစားခွဲ ပြင်ဆင်ရန်"
            size="md"
          />

          <Button onClick={onClose}>Close</Button>
        </div>

        <form
          onSubmit={variantForm.handleSubmit(submitVariantValues, (errors) => {
            console.log("form validation failed", errors);
          })}
          className="flex flex-1 flex-col"
        >
          {/* Content */}
          <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
            <VariantImageUpload
              imagePreviewUrl={imagePreviewUrl}
              onFileChange={handleImageChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <VariantField
                label="Color"
                error={variantForm.formState.errors.color?.message}
              >
                <Input
                  id="variant-color"
                  placeholder="Enter color"
                  {...variantForm.register("color")}
                />
              </VariantField>

              <VariantField
                label="Gender"
                error={variantForm.formState.errors.gender?.message}
              >
                <Input
                  id="variant-gender"
                  placeholder="Enter gender"
                  {...variantForm.register("gender")}
                />
              </VariantField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <VariantField
                label="Size"
                error={variantForm.formState.errors.size?.message}
              >
                <Input
                  id="variant-size"
                  placeholder="Enter size"
                  {...variantForm.register("size")}
                />
              </VariantField>

              <VariantField
                label="Stock"
                error={variantForm.formState.errors.stock?.message}
              >
                <Input
                  id="variant-stock"
                  type="number"
                  min="0"
                  placeholder="Enter stock"
                  {...variantForm.register("stock", { valueAsNumber: true })}
                />
              </VariantField>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-4 py-5">
            <Button
              type="button"
              onClick={onClose}
              disabled={updateVariantMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateVariantMutation.isPending}>
              {updateVariantMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVariantDrawer;
