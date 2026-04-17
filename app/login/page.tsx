import { signIn } from "@/features/auth/server/actions/sign-in";
import Image from "next/image";
import Field, { FieldError } from "@/components/ui/Field";
import { Input } from "@base-ui/react/input";
import { Button } from "@/components/ui/button";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};
export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="flex flex-col min-h-screen md:min-h-0 relative ">
      <section className="bg-[#FDF7F1] h-fit relative flex flex-1 ">
        <div className="absolute flex justify-center p-6 inset-x-0">
          <Image
            src="/logo.svg"
            alt="logo-text"
            width={100}
            height={100}
            loading="eager"
            priority
            className="w-26 object-contain"
          />
        </div>

        {/* <img src="/login-background.svg" alt="login-background" /> */}
        <div className="w-full top-4 bgred-300 h-50 flex">
          <Image
            src="/login-background.svg"
            alt="login-background"
            width={100}
            height={100}
            loading="eager"
            priority
            className="w-full h-full object-contain"
          />
        </div>

        <div className=" absolute  inset-y-0 inset-x-0 top-34 bottom-0 flex justify-center items-center">
          <Image
            src="/login-bear.svg"
            alt="bear-image"
            width={100}
            height={100}
            loading="eager"
            priority
            className="w-30 h-30"
          />
        </div>
      </section>

      {/* 
      <div className="b-amber-300 absolute flex justify-center items-center top-0 left-0 right-0">
        <Image
          src="/login-message.svg"
          alt="bear-image"
          width={100}
          height={100}
          loading="eager"
          priority
          className="w-60"
        />
      </div> */}

      <div className="bgamber-400 text-center bg-gray-60 py-6">
        <h1 className="font-margarine text-2xl text-[#2A2017]">
          Hello, Tinger!
        </h1>
        <p className="font-umoe relative bottom-1 text-lg">
          (မင်္ဂလာပါ တင်ဂါတို့)
        </p>
        <p className="font-quicksand text-sm font-medium m-auto">
          Let’s make today a happy one and a really good productive day.
        </p>
      </div>

      <div className="relative z-10 flex-1 w-full max-w-md m-auto rounded-2xl px-4 py-8 ">
        <form action={signIn} className="space-y-4 flex flex-col gap-2">
          <Field
            label="tingers' email"
            subLabel="email ကိုအောက်တွင်ရိုက်ပေးပါ."
            forInput="email"
          >
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="bg-[#F8F8F8] w-full p-4 rounded-xl font-quicksand text-[#2A2017] text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-amber-600/40 focus-visible:border-amber-700"
            />
          </Field>

          <Field
            label="password"
            subLabel="password အောက်တွင်ရိုက်ပေးပါ."
            forInput="password"
          >
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="**************"
              className="bg-[#F8F8F8] w-full p-4 rounded-xl font-quicksand text-[#2A2017] text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-amber-600/40 focus-visible:border-amber-700"
            />
            {error ? <FieldError message={error} /> : null}
          </Field>

          <Button className="w-full" type="submit" variant="bubble" size="lg">
            Start Shift Now
          </Button>
        </form>
      </div>
    </main>
  );
}
