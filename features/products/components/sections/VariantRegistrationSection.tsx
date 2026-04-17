"use client";

import React, { useState, useEffect } from "react";
import z from "zod";

import { VariantRegistrationValues } from "../../schema/product-variant-registration.schema";
import VariantCreateForm from "../variants/VariantCreateForm";
import { useProductRegistrationFormStore } from "@/features/products/stores/useProductRegistrationFormStore";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VariantRegistrationSection = () => {
  const {
    variantFormMode,
    savedVariantDraft,
    setVariantFormMode,
    addVariantDraft,
    editVariantDraftId,
    setEditVariantDraftId,
    editVariantDraft,
  } = useProductRegistrationFormStore();

  const handleAddVariantDraft = (values: VariantRegistrationValues) => {
    addVariantDraft(values);
  };

  const handleSaveEditVariantDraft = (
    draftId: string,
    updatedValues: VariantRegistrationValues,
  ) => {
    const edited = editVariantDraft(draftId, updatedValues);
    if (!edited) toast.error("Variant does not exist!");
  };

  return (
    <section>
      {Object.keys(savedVariantDraft).length && (
        <div className="mb-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Saved Variants</h3>
            <p>{Object.keys(savedVariantDraft).length ?? 0} items</p>
          </div>
          <VariantDraftListItems />
        </div>
      )}

      {/*  Variant Create Form */}
      {variantFormMode === "create" && (
        <VariantCreateForm
          mode="create"
          onSubmit={handleAddVariantDraft}
          onCancel={() => setVariantFormMode("close")}
        />
      )}

      {/*  Variant Create Form */}
      {/* Variant Edit Form */}
      {variantFormMode === "edit" &&
        editVariantDraftId &&
        savedVariantDraft[editVariantDraftId] && (
          <VariantCreateForm
            mode="edit"
            existingValues={savedVariantDraft[editVariantDraftId]}
            onSubmit={(values) =>
              handleSaveEditVariantDraft(editVariantDraftId, values)
            }
            onCancel={() => {
              setEditVariantDraftId(null);
              setVariantFormMode("close");
            }}
          />
        )}

      <Button
        className="flex flex-col items-start gap-1 rounded-lg h-full"
        onClick={() => setVariantFormMode("create")}
      >
        <span className="font-bold text-lg">Add Variants</span>
        <span className="text-xs text-slate-500">
          (ဒီနေ့ product အရရောင်းရဆုံးစာရင်း)
        </span>
      </Button>
    </section>
  );
};

export default VariantRegistrationSection;

const VariantDraftListItems = () => {
  const {
    savedVariantDraft,
    setVariantFormMode,
    removeVariantDraft,
    setEditVariantDraftId,
  } = useProductRegistrationFormStore();

  return (
    <ul className="list-disc list-inside">
      {Object.entries(savedVariantDraft).map(([draftId, variant]) => {
        const previewUrl = URL.createObjectURL(variant.imageFile);
        return (
          <li key={draftId}>
            <Image
              src={previewUrl}
              alt="preview"
              width={100}
              height={100}
              className="h-24 w-24 rounded-md border object-contain"
              unoptimized
            />
            <p>
              {variant.color} · {variant.size} · {variant.gender}
            </p>
            <p>Stock: {variant.stock}</p>
            <div>
              <Button
                onClick={() => {
                  setVariantFormMode("edit");
                  setEditVariantDraftId(draftId);
                }}
              >
                Edit
              </Button>

              <Button
                onClick={() => {
                  setVariantFormMode("close");
                  removeVariantDraft(draftId);
                }}
              >
                Remove
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
