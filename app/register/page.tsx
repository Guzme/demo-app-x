"use client";

import Link from "next/link";
import { useActionState } from "react";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import { registerUser } from "@/actions/auth-actions";

const initialState = {
  error: "",
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 px-4">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
          <section className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-violet-900 via-slate-900 to-slate-800 p-10 text-white">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                APP-X
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Crea tu cuenta y empieza a organizar tus tareas
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/75">
                Regístrate para acceder a tu espacio personal, administrar tus
                tareas y llevar el control de tu progreso desde un solo lugar.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-white/80">
                  Una experiencia simple, visual y moderna para gestionar tus
                  actividades diarias.
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
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
                  <UserPlus className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Crear cuenta
                </h2>
                <p className="text-sm text-slate-500">
                  Regístrate para comenzar a usar App-X.
                </p>
              </div>

              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Nombre
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3">
                    <User className="h-4 w-4 text-slate-400" />
                    <input
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-violet-700 disabled:opacity-50"
                >
                  <UserPlus className="h-4 w-4" />
                  {isPending ? "Creando cuenta..." : "Registrarme"}
                </button>
              </form>

              <p className="text-center text-sm text-slate-500">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="font-medium text-violet-600 hover:text-violet-700"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}