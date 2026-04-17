"use server";
import { productService } from "@/features/products/server/product.server.service";
import { ActionResult } from "@/features/products/schema/product.schema";
import { searchProductsInputSchema } from "@/features/products/schema/product-search.schema";
import { updateVariantInputSchema } from "../schema/variant-form.schema";
import {
  checkImageFileType,
  checkImageIsFile,
  checkImageSize,
} from "../utils/variant-image-validation";
import { dummyLog } from "../utils/dummy-log";

export async function searchProductsAction(payload: any): Promise<any> {
  const validatedPayload = searchProductsInputSchema.safeParse(payload);

  if (!validatedPayload.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        userMsg: "Please check your input.",
        details: validatedPayload.error.issues,
      },
    };
  }

  const result = await productService.searchProducts(validatedPayload.data);

  if (result.isErr()) {
    return {
      success: false,
      error: {
        code: result.error.code,
        userMsg: result.error.userMsg,
      },
    };
  }

  return {
    success: true,
    data: result.value,
  };
}

export async function updateVariantAction(payload: FormData): Promise<any> {

  dummyLog.show("Action: Received payload", payload, "server");
  const validatedPayload = updateVariantInputSchema.safeParse({
    id: payload.get("id"),
    color: payload.get("color"),
    size: payload.get("size"),
    gender: payload.get("gender"),
    stock: Number(payload.get("stock")),  });

  if (!validatedPayload.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        userMsg: "Please check your input.",
        details: validatedPayload.error.issues,
      },
    };
  }

  const uploadedImage = payload.get("image");
  const imageFileResult = checkImageIsFile(uploadedImage);
  if (!imageFileResult.success) return imageFileResult.response;

  const validatedImageFile = imageFileResult.file;
  const imageSizeResult = checkImageSize(validatedImageFile);

  if (!imageSizeResult.success) return imageSizeResult.response;
  const imageTypeResult = checkImageFileType(validatedImageFile);

  if (!imageTypeResult.success) return imageTypeResult.response;
  const imageFile = validatedImageFile;

  const result = await productService.updateVariant({
    ...validatedPayload.data,
    imageFile,
  });

  if (result.isErr()) {
    return {
      success: false,
      error: {
        code: result.error.code,
        userMsg: result.error.userMsg, },
    };
  }

  return {
    success: true,
    data: result.value,
  };
}
