import { registerUser } from "@/actions/auth-actions";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <form action={registerUser} className="w-full max-w-sm space-y-4 border rounded-xl p-6">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>

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

        <button
          type="submit"
          className="w-full rounded-md bg-black text-white py-2"
        >
          Registrarme
        </button>
      </form>
    </main>
  );
}