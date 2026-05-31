"use client";

import type { MouseEventHandler } from "react";

interface GoogleAuthButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function GoogleAuthButton({ label, onClick, disabled }: GoogleAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="h-5 w-5" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-full w-full">
          <path d="M23.99 12.26c0-.82-.07-1.61-.2-2.38H12v4.51h6.56c-.28 1.5-1.08 2.77-2.3 3.62v3.01h3.72c2.18-2.01 3.42-4.97 3.42-8.76Z" fill="#4285F4" />
          <path d="M12 24c2.97 0 5.47-.98 7.29-2.65l-3.72-3.01c-1.03.7-2.35 1.12-3.57 1.12-2.74 0-5.07-1.85-5.9-4.35H2.24v3.02C4.99 21.85 8.22 24 12 24Z" fill="#34A853" />
          <path d="M6.1 14.11c-.23-.7-.36-1.45-.36-2.22 0-.77.13-1.52.36-2.22v-3.02H2.24A11.96 11.96 0 0 0 0 12.22c0 1.98.48 3.85 1.32 5.51l3.78-3.62Z" fill="#FBBC04" />
          <path d="M12 4.77c1.62 0 3.08.56 4.22 1.66l3.16-3.16C17.45 1.3 14.96 0 12 0 8.22 0 4.99 2.15 2.24 5.63l3.86 3.02c.83-2.5 3.16-4.35 5.9-4.35Z" fill="#EA4335" />
        </svg>
      </span>
      {label}
    </button>
  );
}
