import React from "react";

type FieldProps = {
  label: string;
  subLabel?: string;
  forInput: string;
  children: React.ReactNode;
};

const Field = ({ label, subLabel, forInput, children }: FieldProps) => {
  return (
    <div className="space-y-2 relative">
      <label
        className="font-margarine text-lg font-medium capitalize"
        htmlFor={forInput}
      >
        {label}
      </label>
      <p className="font-umoe text-sm">({subLabel ?? ""})</p>
      <p></p>
      {children}
    </div>
  );
};

export default Field;

type FieldErrorProps = {
  message?: string;
};
export const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <p className="text-sm text-red-600 font-quicksand font-medium">
      * {message}
    </p>
  );
};
