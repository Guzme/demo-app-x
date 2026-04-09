"use client";

import { createTask } from "@/actions/task-actions";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export function CreateTaskForm() {
  return (
    <form
      action={async (formData) => {
        try {
          await createTask(formData);
          toast.success("Tarea creada");
        } catch {
          toast.error("Error al crear tarea");
        }
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Título</label>
        <input
          name="title"
          type="text"
          placeholder="Ej: Terminar reporte"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Descripción</label>
        <textarea
          name="content"
          placeholder="Detalles de la tarea..."
          className="min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
      >
        <PlusCircle className="h-4 w-4" />
        Crear tarea
      </button>
    </form>
  );
}