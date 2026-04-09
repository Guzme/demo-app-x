import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  // Si ya está logueado → lo mandamos al dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
        🚀 App-X
      </h1>
         
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8 font-(--font-inter)">
        Administra tus tareas de forma simple, rápida y segura.  
        Construido con Next.js, Prisma y Auth.js.
      </p>

      {/* BOTONES */}
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 rounded-xl bg-black text-white hover:opacity-80 transition"
        >
          Iniciar sesión
        </Link>

        <Link
          href="/register"
          className="px-6 py-3 rounded-xl border hover:bg-gray-100 transition"
        >
          Crear cuenta
        </Link>
      </div>
    </main>
  );
}