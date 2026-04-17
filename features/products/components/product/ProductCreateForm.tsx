"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Field, { FieldError } from "@/components/ui/Field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  productRegistrationSchema,
  ProductRegistrationValues,
} from "@/features/products/schema/product-variant-registration.schema";
import { Button } from "@/components/ui/button";

type ProductCreateFormProps = {
  mode: "create" | "edit";
  existingValues?: ProductRegistrationValues;
  onSubmit: (values: ProductRegistrationValues) => void;
  onCancel: () => void;
};

const ProductCreateForm = ({
  mode = "create",
  existingValues,
  onSubmit,
  onCancel,
}: ProductCreateFormProps) => {
  const productForm = useForm<ProductRegistrationValues>({
    resolver: zodResolver(productRegistrationSchema),
    defaultValues: existingValues ?? {
      productName: "",
      productSeriesCode: "",
      categoryName: "",
      price: 0,
      cost: 0,
    },
  });

  return (
    <form
      onSubmit={productForm.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Field label="Product Name" forInput="productName">
        <Input
          {...productForm.register("productName")}
          placeholder="Enter product name"
          required
        />
        <FieldError
          message={productForm.formState.errors.productName?.message}
        />
      </Field>
      <Field label="Series Code" forInput="productSeriesCode">
        <Input
          {...productForm.register("productSeriesCode")}
          placeholder="Enter series code"
        />
        <FieldError
          message={productForm.formState.errors.productSeriesCode?.message}
        />
      </Field>

      <Field label="Category" forInput="categoryName">
        <Controller
          control={productForm.control}
          name="categoryName"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dresses">Dresses</SelectItem>
                <SelectItem value="Tops">Tops</SelectItem>
                <SelectItem value="Bottoms">Bottoms</SelectItem>
                <SelectItem value="Sets">Sets</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError
          message={productForm.formState.errors.categoryName?.message}
        />
      </Field>

      <Field label="Price" forInput="price">
        <Input
          type="number"
          min="0"
          required
          {...productForm.register("price", { valueAsNumber: true })}
          placeholder="Enter selling price"
        />
        <FieldError message={productForm.formState.errors.price?.message} />
      </Field>

      <Field label="Cost" forInput="cost">
        <Input
          type="number"
          min="0"
          {...productForm.register("cost", { valueAsNumber: true })}
          placeholder="Enter cost"
          required
        />
        <FieldError message={productForm.formState.errors.cost?.message} />
      </Field>

      <div className="w-full flex justify-between mt-4">
        <Button
          type="submit"
          className="mr-2 flex-1 bg-amber-100 p-4 rounded-2xl"
        >
          {mode === "create" ? "Create Product" : "Save Changes"}
        </Button>
        <Button
          type="button"
          className="flex-1 bg-gray-400 p-4 rounded-2xl"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductCreateForm;
