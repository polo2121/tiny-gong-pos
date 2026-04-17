"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  ProductRegistrationValues,
  VariantRegistrationValues,
} from "../schema/product-variant-registration.schema";

export type ProductFormMode = "create" | "edit" | "close";
export type VariantFormMode = "create" | "edit" | "close";

// export type VariantRegistrationDraftValues =
// VariantRegistrationValues ;

const normalize = (value: string) => value.trim().toLowerCase();

export interface State {
  // Form Control
  productFormMode: ProductFormMode;
  variantFormMode: VariantFormMode;

  // Draft Data
  savedProductDraft: ProductRegistrationValues | null;
  savedVariantDraft: Record<string, VariantRegistrationValues>;

  // Which variant draft is currently being edited.
  editVariantDraftId: string | null;
}

export interface Action {
  // Draft Data Action
  setProductFormMode: (mode: ProductFormMode) => void;
  setVariantFormMode: (mode: VariantFormMode) => void;

  // Product Draft CRUD
  createProductDraft: (values: ProductRegistrationValues) => void;
  editProductDraft: (updatedValues: ProductRegistrationValues) => void;
  removeProductDraft: () => void;

  // Variant Draft CRUD
  addVariantDraft: (values: VariantRegistrationValues) => boolean;
  editVariantDraft: (
    draftId: string,
    updatedValues: VariantRegistrationValues,
  ) => boolean;
  removeVariantDraft: (draftId: string) => boolean;

  // Edit target + full reset
  setEditVariantDraftId: (draftId: string | null) => void;
  checkDuplicateVariantDraft: (
    values: VariantRegistrationValues,
    // excludeDraftId?: string,
  ) => boolean;

  clearAllDraft: () => void;
}

export const useProductRegistrationFormStore = create<State & Action>()(
  immer((set, get) => ({
    // Initial UI state
    productFormMode: "close",
    variantFormMode: "close",

    // Initial drafts
    savedProductDraft: null,
    savedVariantDraft: {},

    // No active edit by default
    editVariantDraftId: null,

    setProductFormMode: (mode) =>
      set((state) => {
        state.productFormMode = mode;
      }),

    setVariantFormMode: (mode) =>
      set((state) => {
        state.variantFormMode = mode;
      }),

    // Product CRUD
    // Save product draft and close product form
    createProductDraft: (values) =>
      set((state) => {
        state.savedProductDraft = values;
        state.productFormMode = "close";
      }),

    // Replace existing product draft and close product form
    editProductDraft: (updatedValues: ProductRegistrationValues) =>
      set((state) => {
        state.savedProductDraft = updatedValues;
        state.productFormMode = "close";
      }),

    // Remove product + related variant drafts, reset modes
    removeProductDraft: () =>
      set((state) => {
        state.savedProductDraft = null;
        state.savedVariantDraft = {};
        state.productFormMode = "close";
        state.variantFormMode = "close";
      }),

    // Variant CRUD
    // Add new variant draft under generated key
    addVariantDraft: (values) => {
      const { checkDuplicateVariantDraft } = get();
      if (checkDuplicateVariantDraft(values)) return false;
      set((state) => {
        state.savedVariantDraft[crypto.randomUUID()] = values;
        state.variantFormMode = "close";
      });
      return true;
    },

    setEditVariantDraftId: (draftId) =>
      set((state) => {
        state.editVariantDraftId = draftId;
      }),

    // Edit existing variant draft by id
    editVariantDraft: (draftId, updatedValues) => {
      let edited = false;
      const { savedVariantDraft, checkDuplicateVariantDraft } = get();

      const currentDraft = savedVariantDraft[draftId];
      if (!currentDraft) return edited = false;
      if (checkDuplicateVariantDraft(updatedValues)) return edited = false;

      set((state) => {
        state.savedVariantDraft[draftId] = {
          ...currentDraft,
          ...updatedValues,
        };
        state.variantFormMode = "close";
        state.editVariantDraftId = null;
        edited = true;
      });

      return edited;
    },

    // Remove variant draft by id
    removeVariantDraft: (draftId: string) => {
      let removed = false;

      set((state) => {
        if (!state.savedVariantDraft[draftId]) return;
        delete state.savedVariantDraft[draftId];
        removed = true;
      });

      return removed;
    },

    checkDuplicateVariantDraft: (values) => {
      const { savedVariantDraft } = get();

      return Object.entries(savedVariantDraft).some(([draftId, variant]) => {
        // if (excludeDraftId && draftId === excludeDraftId) return false;
        return (
          normalize(variant.color) === normalize(values.color) &&
          normalize(variant.size) === normalize(values.size) &&
          normalize(variant.gender) === normalize(values.gender)
        );
      });
    },

    // Reuse existing remove action for full reset
    clearAllDraft: () => {
      const { removeProductDraft } = get();
      removeProductDraft();
    },
  })),
);
