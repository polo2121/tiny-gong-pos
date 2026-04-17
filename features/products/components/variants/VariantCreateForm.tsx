"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Field, { FieldError } from "@/components/ui/Field";
import { Input } from "@/components/ui/input";
import {
  variantRegistrationSchema,
  VariantRegistrationValues,
} from "@/features/products/schema/product-variant-registration.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ImageUploadField from "@/components/ImageUploadField";

type VariantCreateFormProps = {
  mode: "create" | "edit";
  existingValues?: VariantRegistrationValues;
  onSubmit: (values: VariantRegistrationValues) => void;
  onCancel: () => void;
};
const VariantCreateForm = ({
  mode = "create",
  existingValues,
  onSubmit,
  onCancel,
}: VariantCreateFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(
    existingValues?.imageFile ?? null,
  );

  const variantForm = useForm<VariantRegistrationValues>({
    resolver: zodResolver(variantRegistrationSchema),
    defaultValues: existingValues ?? {
      color: "",
      size: "",
      gender: "",
      stock: 0,
      imageFile: undefined,
    },
  });

  return (
    <form className="space-y-5" onSubmit={variantForm.handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <ImageUploadField
          label="Variant-Image"
          file={null}
          onFileChange={(file) => {
            setImageFile(file);
            variantForm.setValue("imageFile", file as File, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          error={variantForm.formState.errors.imageFile?.message}
        />

        <Field label="Color" forInput="color">
          <Input {...variantForm.register("color")} placeholder="Enter color" />
          <FieldError message={variantForm.formState.errors.color?.message} />
        </Field>

        <Field label="Size" forInput="size">
          <Input {...variantForm.register("size")} placeholder="Enter size" />
          <FieldError message={variantForm.formState.errors.size?.message} />
        </Field>

        <Field label="Gender" forInput="gender">
          <Controller
            control={variantForm.control}
            name="gender"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boy">Boy</SelectItem>
                  <SelectItem value="Girl">Girl</SelectItem>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={variantForm.formState.errors.gender?.message} />
        </Field>

        <Field label="Stock" forInput="stock">
          <Input
            type="number"
            min="0"
            {...variantForm.register("stock", {
              valueAsNumber: true,
            })}
            placeholder="Enter stock quantity"
          />
          <FieldError message={variantForm.formState.errors.stock?.message} />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          onClick={() => {
            variantForm.reset();
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">
          {mode === "create" ? "Save Variant" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default VariantCreateForm;
