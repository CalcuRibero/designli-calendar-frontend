"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarMonthView } from "../components/CalendarMonthView";
import { createSampleCalendarMonth } from "../components/calendar-data";
import { clearSessionToken, getSessionToken } from "@/lib/auth/session";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getSessionToken();

    if (!token) {
      router.replace("/log-in");
      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <section className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950/20">
            <p className="text-lg font-semibold">Checking your session...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950/20">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Designli Calendar</p>
            <h1 className="mt-2 text-3xl font-semibold">Your calendar dashboard</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              clearSessionToken();
              router.replace("/log-in");
            }}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Sign out
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950/20">
          <CalendarMonthView initialCalendar={createSampleCalendarMonth()} />
        </div>
      </section>
    </main>
  );
}
