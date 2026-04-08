"use client";

import { useState, useTransition } from "react";
import { deleteTask, toggleTask, updateTask } from "@/actions/task-actions";
import { toast } from "sonner";

type TaskItemProps = {
  task: {
    id: string;
    title: string;
    content: string | null;
    done: boolean;
  };
};

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-2xl border bg-white p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`text-base font-semibold ${
                task.done ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>

            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                task.done
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.done ? "Completada" : "Pendiente"}
            </span>
          </div>

          {task.content && (
            <p
              className={`text-sm ${
                task.done ? "line-through text-gray-400" : "text-gray-600"
              }`}
            >
              {task.content}
            </p>
          )}
        </div>

        {!isEditing && (
          <div className="flex flex-wrap gap-2">
            <form action={(formData) => {
                  startTransition(async () => {
                    try {
                      await toggleTask(formData);
                      toast.success("Estado actualizado");
                    } catch {
                      toast.error("Error al actualizar");
                    }
                  });
                }}
>
              <input type="hidden" name="taskId" value={task.id} />
              <input type="hidden" name="done" value={String(task.done)} />
              <button
                type="submit"
                className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50 transition"
              >
                {task.done ? "Reabrir" : "Completar"}
              </button>
            </form>

            {!task.done && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50 transition"
              >
                Editar
              </button>
            )}

                  <form
                    action={(formData) => {
                      const confirmed = window.confirm(
                        "¿Estás seguro de que deseas eliminar esta tarea?"
                      );

                      if (!confirmed) return;

                      startTransition(async () => {
                        try {
                          await deleteTask(formData);
                          toast.success("Tarea eliminada");
                        } catch {
                          toast.error("Error al eliminar");
                        }
                      });
                    }}
                  >
                <input type="hidden" name="taskId" value={task.id} />
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg border px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-60"
                >
                    {isPending ? "Eliminando..." : "Eliminar"}
                </button>
                </form>
          </div>
        )}
      </div>

      {isEditing && (
          <form
              action={(formData) => {
                startTransition(async () => {
                  try {
                    await updateTask(formData);
                    toast.success("Tarea actualizada");
                    setIsEditing(false);
                  } catch {
                    toast.error("Error al actualizar");
                  }
                });
              }}
              className="space-y-3 border-t pt-4"
            >

          <input type="hidden" name="taskId" value={task.id} />

          <input
            name="title"
            defaultValue={task.title}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />

          <textarea
            name="content"
            defaultValue={task.content ?? ""}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10 min-h-[100px]"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {isPending ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isPending}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-60"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}