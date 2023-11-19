import { recipeRouter } from "~/server/api/routers/recipe";
import { createTRPCRouter } from "~/server/api/trpc";
import { ingredientsRouter } from "./routers/ingredients";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ingredient: ingredientsRouter,
  recipe: recipeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
