"use client";

import { createTask } from "@/actions/task-actions";
import { toast } from "sonner";

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
      className="space-y-3"
    >
      <input
        name="title"
        type="text"
        placeholder="Título"
        className="w-full border rounded-md px-3 py-2"
      />

      <textarea
        name="content"
        placeholder="Descripción"
        className="w-full border rounded-md px-3 py-2"
      />

      <button
        type="submit"
        className="rounded-md bg-black text-white px-4 py-2"
      >
        Crear tarea
      </button>
    </form>
  );
}