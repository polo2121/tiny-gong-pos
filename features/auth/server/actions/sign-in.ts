"use server";

import { redirect } from "next/navigation";
import { AppError, getUserMessage } from "@/lib/error";
import { createClient } from "@/lib/supabase/server";
import { signInSchema } from "@/features/auth/schema/auth.schema";
import { z } from "zod";

export async function signIn(formData: FormData) {
  try {
    const validatedData = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedData.success) {
      const fieldErrors = z.flattenError(validatedData.error).fieldErrors;
      const message =
        fieldErrors.email?.[0] ??
        fieldErrors.password?.[0] ??
        "Invalid form submission.";

      throw new AppError("Failed to sign in.", {
        code: "VALIDATION_ERROR",
        userMsg: message,
        context: "auth.signIn",
        cause: validatedData.error,
      });
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword(
      validatedData.data,
    );

    if (error) {
      if (error.status === 400 || error.status === 401) {
        throw new AppError("Failed to sign in.", {
          code: "UNAUTHORIZED",
          userMsg: "Invalid email or password.",
          context: "auth.signIn",
          cause: error,
          details: {
            message: error.message,
            status: error.status,
            code: error.code,
          },
        });
      }

      throw new AppError("Failed to sign in.", {
        code: "UNAUTHORIZED",
        userMsg: "Unable to sign in right now. Please try again.",
        context: "auth.signIn",
        cause: error,
        details: {
          message: error.message,
          status: error.status,
          code: error.code,
        },
      });
    }
  } catch (error: unknown) {
    redirect(`/login?error=${encodeURIComponent((error as AppError).userMsg)}`);
  }

  redirect("/workspace");
}
