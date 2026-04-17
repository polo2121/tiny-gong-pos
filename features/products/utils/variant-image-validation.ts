import { dummyLog } from "./dummy-log";

type FileValidationResult =
  | {
      success: true;
      file: File;
    }
  | ValidationFailure;

type ValidationSuccess = {
  success: true;
};

type ValidationFailure = {
  success: false;
  response: {
    success: false;
    error: {
      code: "VALIDATION_ERROR";
      userMsg: string;
    };
  };
};
type ValidationResult = ValidationSuccess | ValidationFailure;

export function checkImageIsFile(
  imageEntry: FormDataEntryValue | null,
): FileValidationResult {
  if (!(imageEntry instanceof File) || imageEntry.size === 0) {
    return {
      success: false,
      response: {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          userMsg: "Please upload a variant image.",
        },
      },
    };
  }

  return {
    success: true,
    file: imageEntry,
  };
}

export function checkImageSize(imageFile: File): ValidationResult {
  dummyLog.show("Validating Image Size", {
    fileName: imageFile.name,
    fileSize: imageFile.size,
  });
  const maxFileSize = 1024 * 1024;

  if (imageFile.size > maxFileSize) {
    return {
      success: false,
      response: {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          userMsg: "Image size must be 1 MB or smaller.",
        },
      },
    };
  }

  return {
    success: true,
  };
}

export function checkImageFileType(imageFile: File): ValidationResult {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(imageFile.type)) {
    return {
      success: false,
      response: {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          userMsg: "Only JPG, PNG, and WEBP images are allowed.",
        },
      },
    };
  }

  return {
    success: true,
  };
}
