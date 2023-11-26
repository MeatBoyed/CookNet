"use server";
import { Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { handlePrismaUpdateSavedRecipes } from "./PrismaErrorHandler";

/**
 * Adds Recipe to User's saved recipes
 * @param userId
 * @param recipeId
 * @returns
 */
export const UpdateSavedRecipes = async (userId: string, recipeId: string) => {
  "use server";
  try {
    // Assuming you have a relationship between User and Recipe models
    await db.user.update({
      where: { id: userId },
      data: {
        savedRecipes: {
          upsert: {
            where: { recipeId: recipeId }, // Unique constraint field
            update: { recipeId: recipeId }, // Values to update if the record exists
            create: { recipeId: recipeId }, // Values to insert if the record doesn't exist
          },
        },
      },
    });

    return { id: "", errorMessage: "" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return { id: "", errorMessage: handlePrismaUpdateSavedRecipes(error) };
    } else {
      // Handle other types of errors or unexpected scenarios
      console.error("Unhandled Error:", error);
      return { id: "", errorMessage: "An unexpected error occurred." };
    }
  }
};

export const RemoveRecipeFromSaved = async (
  userId: string,
  recipeId: string,
) => {
  "use server";
  try {
    // Assuming you have a relationship between User and Recipe models
    const user = await db.user.update({
      where: { id: userId },
      data: {
        savedRecipes: {
          delete: { recipeId: recipeId, AND: { userId: userId } },
        },
      },
      include: {
        savedRecipes: true,
      },
    });

    return { id: "", errorMessage: "", data: user };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return { id: "", errorMessage: handlePrismaUpdateSavedRecipes(error) };
    } else {
      // Handle other types of errors or unexpected scenarios
      console.error("Unhandled Error:", error);
      return { id: "", errorMessage: "An unexpected error occurred." };
    }
  }
};

export const LikeRecipe = async (userId: string, recipeId: string) => {
  "use server";
  try {
    // Assuming you have a relationship between User and Recipe models
    await db.user.update({
      where: { id: userId },
      data: {
        likedRecipes: {
          upsert: {
            where: { recipeId: recipeId }, // Unique constraint field
            update: { recipeId: recipeId }, // Values to update if the record exists
            create: { recipeId: recipeId }, // Values to insert if the record doesn't exist
          },
        },
      },
    });

    return { id: "", errorMessage: "" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return { id: "", errorMessage: handlePrismaUpdateSavedRecipes(error) };
    } else {
      // Handle other types of errors or unexpected scenarios
      console.error("Unhandled Error:", error);
      return { id: "", errorMessage: "An unexpected error occurred." };
    }
  }
};

export const UnLikeRecipe = async (userId: string, recipeId: string) => {
  "use server";
  try {
    // Assuming you have a relationship between User and Recipe models
    await db.user.update({
      where: { id: userId },
      data: {
        likedRecipes: {
          delete: { recipeId: recipeId, AND: { userId: userId } },
        },
      },
    });

    return { id: "", errorMessage: "" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors
      return { id: "", errorMessage: handlePrismaUpdateSavedRecipes(error) };
    } else {
      // Handle other types of errors or unexpected scenarios
      console.error("Unhandled Error:", error);
      return { id: "", errorMessage: "An unexpected error occurred." };
    }
  }
};
