import { ReactNode } from "react";

type VariantFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

const VariantField = ({ label, error, children }: VariantFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

export default VariantField;
