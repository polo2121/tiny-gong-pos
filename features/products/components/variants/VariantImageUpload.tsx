"use client";

import { Button } from "@/components/ui/button";

type VariantImageUploadProps = {
  imagePreviewUrl: string | null;
  onFileChange: (file: File | null) => void;
};

const VariantImageUpload = ({
  imagePreviewUrl,
  onFileChange,
}: VariantImageUploadProps) => {
  return (
    <div className="space-y-3">
      <label className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        Variant Image
      </label>

      <div className="flex items-start gap-4">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt="Variant preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              No Image
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              required
              onChange={(event) =>
                onFileChange(event.target.files?.[0] ?? null)
              }
            />
          </label>

          <p className="text-xs text-slate-500">
            Upload a clean variant image before saving changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VariantImageUpload;
