"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BubbleButton from "@/components/ui/BubbleButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/preview-table"); // redirect after login
    }
  };

  return (
    <section className="b-gray-500 flex justify-center items-center mt-20">
      <div className="w-[30%] b-amber-300 flex flex-col gap-4">
        <header className="p-4 flex flex-col gap-2">
          <h2 className="text-3xl font-margarine text-center">
            Hello Again, Tinies!
          </h2>
          <p className="font-quicksand text-base text-center">
            This is the login form to view the table before diving into details.
          </p>
        </header>

        <input
          className="b-red-400 p-4 font-quicksand font-medium rounded-xl ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <input
          className="b-red-400 p-4 font-quicksand font-medium rounded-xl ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <button onClick={handleLogin}>LOG IN NOW</button>

        <BubbleButton href="/sales" variant="brown" icon={false}>
          Click Me
        </BubbleButton>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </section>
  );
}
