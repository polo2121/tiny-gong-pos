"use client";

import { updateVariantAction } from "@/features/products/server/product.server.action";
import { dummyLog } from "../utils/dummy-log";

async function updateVariant(payload: FormData) {
  try {
    dummyLog.show("ApiGateway: Arrived", payload, "front");
    const result = await updateVariantAction(payload);
    dummyLog.show(
      "ApiGateway: Received response from action, now processing.",
      result,
      "front",
    );
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  } catch (error: any) {
    if (
      error?.statusCode === 413 ||
      error?.message?.includes("Body exceeded 1 MB limit")
    ) {
      throw {
        code: "PAYLOAD_TOO_LARGE",
        userMsg: "Image is too large. Please upload an image smaller than 1 MB.",
      };
    }
    throw error;
  }
}

export const productApi = {
  updateVariant,
};
