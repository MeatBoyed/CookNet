import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

const MainInfoSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      quantity: z.number(),
      measurement: z.string(),
      optional: z.boolean(),
      ingredientId: z.string(), // Assuming it's a string, adjust as needed
    }),
  ),
  steps: z.array(z.string()),
  authorId: z.string(), // Assuming it's a string, adjust as needed
});

const IngredientOnRecipe = z.object({
  id: z.string(),
  quantity: z.number(),
  measurement: z.string(),
  optional: z.boolean(),
  ingredientId: z.string(),
  recipeId: z.string(),
});

const MainInfo = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(IngredientOnRecipe),
  authorId: z.string(),
});

const RecipeFormData = z.object({
  mainInfo: MainInfo,
  steps: z.array(z.string()),
});

export const recipeRouter = createTRPCRouter({
  createRecipe: publicProcedure
    .input(RecipeFormData)
    .mutation(async ({ ctx, input }) => {
      if (input.steps.length === 0) {
        return { type: "error", message: "No Steps" };
      }

      try {
        const res = await ctx.db.recipe.create({
          data: {
            title: input.mainInfo.title,
            description: input.mainInfo.description,
            steps: input.steps,
            author: {
              connect: { id: input.mainInfo.authorId },
            },
            ingredients: {
              create: input.mainInfo.ingredients.map((ingredient) => ({
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

        // if (res.id === undefined) {
        //   return { type: "error", message: "Not Added" };
        // }

        return { type: "success", recipeId: res.id };
      } catch (error) {
        console.error("Error creating recipe:", error);
        return {
          type: "error",
          message:
            "An error occurred while creating the recipe. Please try again.",
        };
      }
    }),
});
