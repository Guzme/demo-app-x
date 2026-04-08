import { loginUser } from "@/actions/auth-actions";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <form action={loginUser} className="w-full max-w-sm space-y-4 border rounded-xl p-6">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

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

        <button
          type="submit"
          className="w-full rounded-md bg-black text-white py-2"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}