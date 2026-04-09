"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
import {
  loginUser,
  loginWithGoogle,
  loginWithGitHub,
} from "@/actions/auth-actions";

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, initialState);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 px-4">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
          <section className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-10 text-white">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                APP-X
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Organiza tus tareas con una experiencia moderna y simple
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/75">
                Inicia sesión con credenciales, Google o GitHub y administra tus
                tareas desde un dashboard limpio y práctico.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-white/80">
                  Accede rápido, mantén el control de tus tareas y visualiza tu
                  progreso en un solo lugar.
                </p>
              </div>

              <p className="text-xs text-white/50">
                Proyecto construido con Next.js, Auth.js, Prisma y Zod.
              </p>
            </div>
          </section>

          <section className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                  <LogIn className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Iniciar sesión
                </h2>
                <p className="text-sm text-slate-500">
                  Bienvenido de nuevo. Ingresa para continuar.
                </p>
              </div>

              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Correo electrónico
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="usuario@correo.com"
                      className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Contraseña
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3">
                    <Lock className="h-4 w-4 text-slate-400" />
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {state?.error ? (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {state.error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-slate-800 disabled:opacity-50"
                >
                  <LogIn className="h-4 w-4" />
                  {isPending ? "Entrando..." : "Entrar"}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400">
                    o continúa con
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <form action={loginWithGoogle}>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="h-4 w-4"
                    />
                    Continuar con Google
                  </button>
                </form>

                <form action={loginWithGitHub}>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 fill-current"
                    >
                      <path d="M12 2C6.477 2 2 6.59 2 12.253c0 4.53 2.865 8.374 6.839 9.73.5.095.682-.222.682-.494 0-.243-.009-.888-.014-1.743-2.782.615-3.369-1.37-3.369-1.37-.455-1.177-1.11-1.49-1.11-1.49-.908-.636.069-.623.069-.623 1.004.072 1.532 1.055 1.532 1.055.892 1.565 2.341 1.113 2.91.851.091-.667.349-1.113.635-1.369-2.221-.26-4.556-1.137-4.556-5.062 0-1.118.39-2.032 1.029-2.749-.103-.261-.446-1.31.098-2.73 0 0 .84-.276 2.75 1.05A9.303 9.303 0 0 1 12 6.836c.85.004 1.705.118 2.504.347 1.909-1.326 2.748-1.05 2.748-1.05.546 1.42.203 2.469.1 2.73.64.717 1.028 1.631 1.028 2.749 0 3.935-2.339 4.799-4.566 5.054.359.318.678.946.678 1.907 0 1.377-.012 2.487-.012 2.824 0 .275.18.594.688.493C19.138 20.624 22 16.782 22 12.253 22 6.59 17.523 2 12 2Z" />
                    </svg>
                    Continuar con GitHub
                  </button>
                </form>
              </div>

              <p className="text-center text-sm text-slate-500">
                ¿No tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="font-medium text-violet-600 hover:text-violet-700"
                >
                  Crear cuenta
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}