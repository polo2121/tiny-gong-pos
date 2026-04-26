"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className={`w-full ${pending ? "cursor-not-allowed opacity-50" : ""}`}
      type="submit"
      variant="bubble"
      size="lg"
    >
      {pending ? "Logging in..." : "Start Shift Now"}
    </Button>
  );
}

export default SubmitButton;
