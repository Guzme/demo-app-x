"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { AuthError } from "next-auth";

export type AuthActionState = {
  error?: string;
};

export async function registerUser(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const result = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { name, email, password } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "El usuario ya existe" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    },
  });

  redirect("/login");
}

export async function loginUser(
  prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email: email.trim(),
      password,
      redirectTo: "/dashboard",
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Correo o contraseña incorrectos" };
      }

      return { error: "No se pudo iniciar sesión" };
    }

    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut({
    redirectTo: "/login",
  });
}

export async function loginWithGoogle(): Promise<void> {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
}

export async function loginWithGitHub(): Promise<void> {
  await signIn("github", {
    redirectTo: "/dashboard",
  });
}