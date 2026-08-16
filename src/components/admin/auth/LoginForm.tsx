"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/login/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-navy-900"
        >
          Adresse email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          placeholder="vous@exemple.com"
          className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 focus:border-magenta-500 focus:ring-2 focus:ring-magenta-500/20 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="code"
          className="mb-1.5 block text-sm font-semibold text-navy-900"
        >
          Code d&apos;accès
        </label>
        <input
          id="code"
          name="code"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Votre code secret"
          className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 focus:border-magenta-500 focus:ring-2 focus:ring-magenta-500/20 focus:outline-none"
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-magenta-500 px-4 py-3 text-admin-button text-white transition-colors hover:bg-magenta-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}