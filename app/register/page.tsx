"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "@/actions/auth-actions";

const initialState = {
  error: "",
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4 border rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>

        <form action={formAction} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Nombre"
            className="w-full border rounded-md px-3 py-2"
          />

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
            {isPending ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}