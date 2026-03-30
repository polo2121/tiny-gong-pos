"use server";

import { redirect } from "next/navigation";
import { AppError } from "@/lib/error";
import { createClient } from "@/lib/supabase/server";
import { getUserMessage } from "@/lib/error";

export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    console.log(supabase.auth.getUser())
    if (error) {
      console.log(error)
      throw new AppError("Failed to sign out.", {
        code: "UNAUTHORIZED",
        statusCode: error.status ?? 500,
        userMsg: "Unable to sign out right now. Please try again.",
        context: "auth.signOut",
        cause: error,
        details: {
          message: error.message,
          status: error.status,
          code: error.code,
        },
      });
    }
  } catch (error) {
    const message = getUserMessage(error);
    redirect(`/workspace?error=${encodeURIComponent(message)}`);
  }

  redirect("/login");
}
