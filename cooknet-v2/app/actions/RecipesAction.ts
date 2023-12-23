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

export async function UpdateRecipe(
  recipeId: string,
  recipe: CreateRecipePayload,
  ingredients: IngredientOnRecipeOmit[]
) {
  try {
    const ingredientsCreate: Prisma.IngredientOnRecipeCreateOrConnectWithoutRecipeInput[] =
      [];

    const ingreUpsert: Prisma.IngredientOnRecipeUpsertWithWhereUniqueWithoutRecipeInput[] =
      [];

    ingredients.map((ingre) => {
      ingredientsCreate.push({
        where: { id: ingre.id || undefined },
        create: ingre,
      });

      ingreUpsert.push({
        where: { id: ingre.id || "" },
        create: ingre,
        update: ingre,
      });
    });
    // connectOrCreate: ingredientsCreate,

    const res = await prisma.recipe.update({
      where: { id: recipeId, authorId: recipe.authorId },
      data: {
        ...recipe,
        authorId: "RandomUser",
        ingredients: {
          upsert: ingreUpsert,
        },
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

export async function DeleteRecipe(recipeId: string) {
  try {
    const r = await prisma.ingredientOnRecipe.deleteMany({
      where: { recipeId: recipeId },
    });

    const res = await prisma.recipe.delete({
      where: { id: recipeId },
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
