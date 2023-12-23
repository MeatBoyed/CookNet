"use server";

import prisma from "@/lib/db";
import { Prisma, User } from "@prisma/client";
import { error } from "console";

export type CreateUserPayload = Omit<User, "createdAt" | "profileImage">;

export async function CreateUser(user: CreateUserPayload) {
  try {
    const res = await prisma.user.create({
      data: { ...user },
    });

    return { data: res };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return { error: "A Ingredient already exists with this name" };
    }
    console.log("Error:", error);
    return { error: "An unknown error occurred. Please try again." };
  }
}

/**
 * (User Action)
 * Adds Recipe to User's CookBook
 * @param userId Current User's Id
 * @param recipeId Current Recipe's Id
 * @returns Error Message or Updated User
 */
export async function AddToCookBook(userId: string, cookbook: string[]) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        cookbook: cookbook,
      },
    });

    return { data: user };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return { error: "Recipe is already in your Cookbook" };
      if (error.code === "P2025")
        return { error: "Please complete your account details." };
    }
    console.log("Error:", error);
    return { error: "An unknown error occurred. Please try again." };
  }
}

export async function RemoveFromCookBook(userId: string, cookbook: string[]) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        cookbook: cookbook,
      },
    });

    return { data: user };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return { error: "Recipe is already in your Cookbook" };
      if (error.code === "P2025")
        return { error: "Please complete your account details." };
    }
    console.log("Error:", error);
    return { error: "An unknown error occurred. Please try again." };
  }
}
