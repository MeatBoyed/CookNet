"use server";

import prisma from "@/lib/db";
import { Prisma, Recipe } from "@prisma/client";

export type CreateRecipePayload = Omit<
  Recipe,
  "id" | "createdDate" | "updatedAt"
>;
export type UploadRecipePayload = Omit<Recipe, "createdDate" | "updatedAt">;

export async function CreateRecipeAction(recipe: CreateRecipePayload) {
  try {
    const res = await prisma.recipe.create({
      data: {
        ...recipe,
      },
    });
    return { data: res.id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return { error: "A Ingredient already exists with this name" };
    }
    console.log("Error:", error);
    return {
      error:
        "An unknown error occurred when creating the Recipe. Please try again.",
    };
  }
}

export async function UpdateRecipeAction(recipe: UploadRecipePayload) {
  try {
    const res = await prisma.recipe.update({
      where: { id: recipe.id },
      data: {
        ...recipe,
      },
    });
    return { data: res.id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return { error: "A Ingredient already exists with this name" };
    }
    return {
      error:
        "An unknown error occurred when creating the Recipe. Please try again.",
    };
  }
}
export async function DeleteRecipeAction(recipeId: string) {
  try {
    const res = await prisma.recipe.delete({
      where: { id: recipeId },
    });
    return { data: res.id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return { error: "A Ingredient already exists with this name" };
    }
    return {
      error:
        "An unknown error occurred when creating the Recipe. Please try again.",
    };
  }
}
