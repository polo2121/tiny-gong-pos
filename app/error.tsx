"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-red-100 bg-red-50 p-8 text-center shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-500 shadow-sm">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-7.938 4h15.876c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          We could not load this page. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
        >
          Try again
        </button>

        {process.env.NODE_ENV === "development" ? (
          <p className="mt-4 text-xs text-red-500">{error.message}</p>
        ) : null}
      </div>
    </main>
  );
}
