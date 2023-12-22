"use server";
import prisma from "@/lib/db";
import { Ingredient, Prisma } from "@prisma/client";

export type CreateIngredientPayload = Omit<Ingredient, "id">;

export async function getIngredients() {
  const response: { data?: Ingredient[]; error?: string } = {
    data: undefined,
    error: undefined,
  };
  try {
    const res = await prisma.ingredient.findMany();
    console.log(res);
    return { data: res };
  } catch (error) {
    console.log(error);
    return { error: "An unknown error occurred. Please try again." };
  }
}

export async function CreateIngredient(ingredient: CreateIngredientPayload) {
  const response: { data?: Ingredient; error?: string } = {
    data: undefined,
    error: undefined,
  };
  try {
    const res = await prisma.ingredient.create({
      data: {
        ...ingredient,
      },
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
