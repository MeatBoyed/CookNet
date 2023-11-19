import { Ingredient, Prisma } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { IngredientSchema } from "~/utils/components/Forms/IngredientsInput";

export const ingredientsRouter = createTRPCRouter({
  getIngredients: publicProcedure.query(async ({ ctx }) => {
    // const ingredients: Ingredient[] = await ctx.db.ingredient.findMany();
    // return ctx.db.ingredient.findMany();
    return ctx.db.ingredient.findMany({ select: { name: true, id: true } });
  }),
});
