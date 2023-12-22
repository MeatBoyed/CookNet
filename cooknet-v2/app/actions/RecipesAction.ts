"use server";

import { IngredientOnRecipeOmit } from "@/components/IngredientsInput";
import prisma from "@/lib/db";
import { Prisma, Recipe } from "@prisma/client";

export type CreateRecipePayload = Omit<
  Recipe,
  "id" | "createdDate" | "updatedAt"
>;

export async function CreateRecipe(
  recipe: CreateRecipePayload,
  ingredients: IngredientOnRecipeOmit[]
) {
  const response: { data?: Recipe; error?: string } = {
    data: undefined,
    error: undefined,
  };
  try {
    const res = await prisma.recipe.create({
      data: {
        ...recipe,
        authorId: "RandomUser",
        ingredients: { createMany: { data: ingredients } },
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
