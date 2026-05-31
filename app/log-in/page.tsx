"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/api/client";
import { getSessionToken, setSessionToken } from "@/lib/auth/session";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";

export default function LogInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getSessionToken()) {
      router.replace("/");
    }
  }, [router]);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authClient.signInWithGoogle();
      setSessionToken(response.token);
      router.replace("/");
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : "Unable to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-12">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950/20">
          <h1 className="text-3xl font-semibold">Sign in to Designli</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Use the Google button below to sign in and access your calendar dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <GoogleAuthButton label="Continue with Google" onClick={handleSignIn} disabled={loading} />
            {error ? (
              <p className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-800 dark:bg-rose-950/20 dark:text-rose-200" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <p className="mt-8 text-sm text-slate-600 dark:text-slate-400">
            No account yet? <a href="/log-up" className="font-semibold text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-2 dark:text-slate-100">Create one</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
