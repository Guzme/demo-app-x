"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }

  const title = formData.get("title")?.toString().trim() || "";
  const content = formData.get("content")?.toString().trim() || "";

  if (!title) {
    throw new Error("El título es obligatorio");
  }

  await prisma.task.create({
    data: {
      title,
      content,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
}

export async function toggleTask(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }

  const taskId = formData.get("taskId")?.toString() || "";
  const doneValue = formData.get("done")?.toString() === "true";

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: session.user.id,
    },
  });

  if (!task) {
    throw new Error("Tarea no encontrada");
  }

  await prisma.task.update({
    where: { id: taskId },
    data: {
      done: !doneValue,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteTask(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }

  const taskId = formData.get("taskId")?.toString() || "";

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: session.user.id,
    },
  });

  if (!task) {
    throw new Error("Tarea no encontrada");
  }

  await prisma.task.delete({
    where: { id: taskId },
  });

  revalidatePath("/dashboard");
}


export async function updateTask(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }

  const taskId = formData.get("taskId")?.toString() || "";
  const title = formData.get("title")?.toString().trim() || "";
  const content = formData.get("content")?.toString().trim() || "";

  if (!taskId) {
    throw new Error("Id de tarea inválido");
  }

  if (!title) {
    throw new Error("El título es obligatorio");
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: session.user.id,
    },
  });

  if (!task) {
    throw new Error("Tarea no encontrada");
  }

  await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      content,
    },
  });

  revalidatePath("/dashboard");
}