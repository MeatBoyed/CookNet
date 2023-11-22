"use server";
import { Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { type RecipeFormData } from "~/utils/components/Forms/CreateRecipeForm";
import { handlePrismaCreateErrors } from "~/utils/lib/PrismaErrorHandler";

export const CreateRecipeEndPoint = async (formData: RecipeFormData) => {
  "use server";
  try {
    const res = await db.recipe.create({
      data: {
        title: formData.mainInfo.title,
        description: formData.mainInfo.description,
        steps: formData.steps,
        author: {
          connect: { id: formData.mainInfo.authorId },
        },
        ingredients: {
          create: formData.mainInfo.ingredients.map((ingredient) => ({
            quantity: ingredient.quantity,
            measurement: ingredient.measurement,
            optional: ingredient.optional,
            ingredient: {
              connect: { id: ingredient.ingredientId },
            },
          })),
        },
      },
    });

    return { id: res.id, errorMessage: "" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return { id: "", errorMessage: handlePrismaCreateErrors(error) };
    } else {
      // Handle other types of errors or unexpected scenarios
      console.error("Unhandled Error:", error);
      return { id: "", errorMessage: "An unexpected error occurred." };
    }
  }
};

export const UpdateRecipe = async (formData: RecipeFormData) => {
  "use server";
  try {
    const res = await db.recipe.update({
      where: { id: formData.recipeId },
      data: {
        title: formData.mainInfo.title,
        description: formData.mainInfo.description,
        steps: formData.steps,
        author: {
          connect: { id: formData.mainInfo.authorId },
        },
        ingredients: {
          create: formData.mainInfo.ingredients.map((ingredient) => ({
            quantity: ingredient.quantity,
            measurement: ingredient.measurement,
            optional: ingredient.optional,
            ingredient: {
              connect: { id: ingredient.ingredientId },
            },
          })),
        },
      },
    });

    return { id: res.id, errorMessage: "" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return { id: "", errorMessage: handlePrismaCreateErrors(error) };
    } else {
      // Handle other types of errors or unexpected scenarios
      console.error("Unhandled Error:", error);
      return { id: "", errorMessage: "An unexpected error occurred." };
    }
  }
};
