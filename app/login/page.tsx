"use client";

import { useActionState } from "react";
import { loginUser, loginWithGoogle, loginWithGitHub } from "@/actions/auth-actions";

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4 border rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        <form action={formAction} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Correo"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded-md px-3 py-2"
          />

          {state?.error ? (
            <p className="text-sm text-red-500">{state.error}</p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-black text-white py-2 disabled:opacity-50"
          >
            {isPending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">o continúa con</span>
          </div>
        </div>

        <form action={loginWithGoogle}>
          <button
            type="submit"
            className="w-full rounded-md border py-2 hover:bg-gray-50 transition"
          >
            Continuar con Google
          </button>
        </form>

        <form action={loginWithGitHub}>
          <button
            type="submit"
            className="w-full rounded-md border py-2 hover:bg-gray-50 transition"
          >
            Continuar con GitHub
          </button>
        </form>
      </div>
    </main>
  );
}