import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logoutUser } from "@/actions/auth-actions";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bienvenido, {session.user.email}</p>

      <form action={logoutUser}>
        <button className="rounded-md bg-black text-white px-4 py-2">
          Cerrar sesión
        </button>
      </form>
    </main>
  );
}