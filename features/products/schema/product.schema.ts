import { z } from "zod";
import { ErrorCode } from "@/lib/error";

export const inventoryMetricsRecordSchema = z.object({
  total_products: z.number(),
  total_in_stock: z.number(),
  total_out_of_stock: z.number(),
  total_cost: z.number(),
});

export type InventoryMetricsRecord = z.infer<
  typeof inventoryMetricsRecordSchema
>;

export type ActionSuccess<T> = {
  success: true;
  data: T;
};
export type ActionFail = {
  success: false;
  error: {
    code: ErrorCode;
    userMsg: string;
    details?: unknown;
  };
};
export type ActionResult<T> = ActionSuccess<T> | ActionFail;
