import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  content: z.string().optional(),
});

export const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "El título es obligatorio"),
  content: z.string().optional(),
  done: z.boolean().optional(),
});