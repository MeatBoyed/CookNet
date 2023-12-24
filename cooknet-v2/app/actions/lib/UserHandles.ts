"use server";

import prisma from "@/lib/db";
import { Recipe } from "@prisma/client";
import { getRecipes } from "./RecipeHandles";

export type RecipeRender = {
  ingredients: {
    ingredient: {
      name: string;
    };
  }[];
  author: {
    username: string;
  };
} & {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: number;
  steps: string[];
  createdDate: Date;
  updatedAt: Date;
  authorId: string;
};

export async function GetUsersRecipes(userId: string) {
  return (
    (
      await prisma.user.findUnique({
        where: { id: userId },
        select: {
          Recipe: {
            include: {
              ingredients: {
                select: {
                  ingredient: { select: { name: true } },
                },
              },
              author: { select: { username: true } },
            },
          },
        },
      })
    )?.Recipe || []
  );
}

export async function GetRecipeCookBook(userId: string) {
  const cookbook = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      cookbook: true,
    },
  });
  if (!cookbook) return [];
  const recipes: RecipeRender[] = [];
  cookbook.cookbook.forEach(async (recipeId) => {
    return await getRecipes(recipeId);
  });
  return recipes || [];
}

/**
 *
 * @param userId User's Id
 * @returns Amount of items in Cook Book
 */
export const getFavoritesCount = async (userId: string) => {
  return (
    (
      await prisma.user.findMany({
        where: { id: userId },
        select: {
          cookbook: true,
        },
      })
    ).length || 0
  );
};

export const getRecipesCount = async (userId: string) => {
  //   return (
  //     await prisma.user.findMany({
  //       where: { id: userId },
  //       select: {
  //         Recipe: true,
  //       },
  //     })
  //   ).length;
  return (
    (
      await prisma.user.findUnique({
        where: { id: userId },
        select: {
          _count: {
            select: {
              Recipe: true,
            },
          },
        },
      })
    )?._count.Recipe || 0
  );
};
