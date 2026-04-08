"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";

export async function registerUser(formData: FormData): Promise<void> {
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";

  if (!name || !email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  redirect("/login");
}

export async function loginUser(formData: FormData): Promise<void> {
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    throw new Error("Correo y contraseña son obligatorios");
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}

export async function logoutUser(): Promise<void> {
  await signOut({
    redirectTo: "/login",
  });
}