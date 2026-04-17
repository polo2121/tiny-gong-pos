// features/products/components/shared/ImageUploadField.tsx
"use client";

import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type ImageUploadFieldProps = {
  label?: string;
  file: File | null;
  fallbackUrl?: string | null;
  accept?: string;
  disabled?: boolean;
  error?: string;
  onFileChange: (file: File | null) => void;
  onRemove?: () => void;
};

const ImageUploadField = ({
  label = "Image",
  file,
  fallbackUrl = null,
  accept = "image/png,image/jpeg,image/webp",
  disabled,
  error,
  onFileChange,
  onRemove,
}: ImageUploadFieldProps) => {
  const previewUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return fallbackUrl;
  }, [file, fallbackUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="preview"
          width={100}
          height={100}
          className="h-24 w-24 rounded-md border object-contain"
          unoptimized
        />
      ) : (
        <div className="w-20 h-20 flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 p-4">
          <h1>No Image</h1>
        </div>
      )}

      <Input
        type="file"
        accept={accept}
        disabled={disabled}
        required
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />

      {onRemove ? (
        <Button type="button" disabled={disabled} onClick={onRemove}>
          Remove Image
        </Button>
      ) : null}

      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

export default ImageUploadField;
