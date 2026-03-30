import { signIn } from "@/features/auth/server/actions/sign-in";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};
export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to continue to Tiny Gong POS.
        </p>

        <form action={signIn} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              placeholder="Enter your password"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
