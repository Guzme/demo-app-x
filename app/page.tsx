import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogIn, UserPlus, Rocket } from "lucide-react";

export default async function HomePage() {
  const session = await auth();

  // Si ya está logueado → lo mandamos al dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* TÍTULO */}
      <div className="flex items-center gap-3 mb-4">
        <Rocket className="w-10 h-10 text-purple-600" />
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          App-X
        </h1>
      </div>

      {/* DESCRIPCIÓN */}
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-10">
        Administra tus tareas de forma simple, rápida y segura.  
        <span className="block mt-1 text-gray-500 text-base">
          Construido con Next.js, Prisma y Auth.js.
        </span>
      </p>

      {/* BOTONES */}
      <div className="flex gap-4 flex-wrap justify-center">
        
        {/* LOGIN */}
        <Link
          href="/login"
          className="flex items-center gap-2 px-6 py-3 rounded-xl 
          bg-gradient-to-r from-indigo-600 to-purple-600 
          text-white font-medium shadow-md
          hover:scale-105 hover:shadow-lg transition"
        >
          <LogIn className="w-4 h-4" />
          Iniciar sesión
        </Link>

        {/* REGISTER */}
        <Link
          href="/register"
          className="flex items-center gap-2 px-6 py-3 rounded-xl 
          border border-gray-300 bg-white text-gray-700 font-medium
          hover:bg-gray-100 hover:scale-105 transition shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Crear cuenta
        </Link>
      </div>

    </main>
  );
}