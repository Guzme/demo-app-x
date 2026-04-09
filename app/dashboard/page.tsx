import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { logoutUser } from "@/actions/auth-actions";
import { TaskItem } from "@/components/task-item";
import { CreateTaskForm } from "@/components/create-task-form";
import {
  LayoutDashboard,
  ListTodo,
  Clock3,
  CheckCircle2,
  LogOut,
  UserCircle2,
  Mail,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const completedTasks = tasks.filter((task) => task.done).length;
  const pendingTasks = tasks.length - completedTasks;

  const userName = session.user.name || "Usuario";
  const userEmail = session.user.email || "Sin correo";
  const userImage = session.user.image;

  const userInitial =
    session.user.name?.charAt(0).toUpperCase() ||
    session.user.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-5xl p-6 space-y-8">
        <section className="flex flex-col gap-6 rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
              <LayoutDashboard className="h-4 w-4" />
              <span>APP-X Dashboard</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Bienvenido, {userName}
            </h1>

            <p className="text-sm text-slate-600">
              Administra tus tareas y mantén tu trabajo organizado.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                  {userInitial}
                </div>
              )}

              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <UserCircle2 className="h-4 w-4 text-indigo-500" />
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {userName}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-500" />
                  <p className="truncate text-sm text-slate-600">{userEmail}</p>
                </div>
              </div>
            </div>

    

            <form action={logoutUser}>
  <div className="relative group">
    <button
      type="submit"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition hover:bg-slate-800"
    >
      <LogOut className="h-5 w-5" />
    </button>
<span className="pointer-events-none absolute right-0 top-12 translate-y-1 whitespace-nowrap rounded-md bg-black px-3 py-1 text-xs text-white opacity-0 shadow transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
    {/* <span className="pointer-events-none absolute right-0 top-12 whitespace-nowrap rounded-md bg-black px-3 py-1 text-xs text-white opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100"> */}
      Cerrar sesión
    </span>
  </div>
</form>

          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-blue-700">Total de tareas</p>
              <ListTodo className="h-5 w-5 text-blue-500" />
            </div>
            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {tasks.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-amber-700">Pendientes</p>
              <Clock3 className="h-5 w-5 text-amber-500" />
            </div>
            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {pendingTasks}
            </h2>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-emerald-700">Completadas</p>
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {completedTasks}
            </h2>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-violet-100 bg-white/90 p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Crear tarea</h2>
            <p className="mt-1 text-sm text-slate-600">
              Agrega una nueva tarea a tu lista.
            </p>
          </div>

          <CreateTaskForm />
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Mis tareas</h2>
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
              Aún no tienes tareas creadas.
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}