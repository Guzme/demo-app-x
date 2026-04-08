import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { logoutUser } from "@/actions/auth-actions";
import { createTask } from "@/actions/task-actions";
import { TaskItem } from "@/components/task-item";
import { CreateTaskForm } from "@/components/create-task-form";

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

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">APP-X Dashboard</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Bienvenido, {session.user.name} 
                {/* {session.user.email} */}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Administra tus tareas y mantén tu trabajo organizado.
            </p>
          </div>

          <form action={logoutUser}>
            <button className="rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition">
              Cerrar sesión
            </button>
          </form>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total de tareas</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {tasks.length}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pendientes</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {pendingTasks}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Completadas</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {completedTasks}
            </h2>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Crear tarea</h2>
            <p className="text-sm text-gray-500 mt-1">
              Agrega una nueva tarea a tu lista.
            </p>
          </div>

          <CreateTaskForm/>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Mis tareas</h2>     
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
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