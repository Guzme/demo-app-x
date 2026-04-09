"use client";

import { useState, useTransition } from "react";
import { deleteTask, toggleTask, updateTask } from "@/actions/task-actions";
import { toast } from "sonner";
import {
  Check,
  RotateCcw,
  Pencil,
  Trash2,
  Save,
  X,
  Circle,
  CheckCircle2,
} from "lucide-react";

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
    <div className="space-y-4 rounded-2xl border bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-base font-semibold ${
                task.done ? "text-gray-400 line-through" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                task.done
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.done ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Circle className="h-3.5 w-3.5" />
              )}
              {task.done ? "Completada" : "Pendiente"}
            </span>
          </div>

          {task.content && (
            <p
              className={`text-sm ${
                task.done ? "text-gray-400 line-through" : "text-gray-600"
              }`}
            >
              {task.content}
            </p>
          )}
        </div>

        {!isEditing && (
          <div className="flex flex-wrap gap-2">
            <form
              action={(formData) => {
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
                disabled={isPending}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-60 ${
                  task.done
                    ? "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                }`}
              >
                {task.done ? (
                  <>
                    <RotateCcw className="h-4 w-4" />
                    Reabrir
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Completar
                  </>
                )}
              </button>
            </form>

            {!task.done && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <Pencil className="h-4 w-4" />
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
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
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
            className="min-h-[100px] w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {isPending ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}