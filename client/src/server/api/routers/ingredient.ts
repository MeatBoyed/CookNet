import { createTRPCRouter, publicProcedure } from "../trpc";

export const ingredientRouter = createTRPCRouter({
  getIngredients: publicProcedure.query(({ ctx }) => {
    return ctx.db.ingredient.findMany();
  }),
});
