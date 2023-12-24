import prisma from "@/lib/db";

export async function getRecipes(recipeId: string) {
  const recipes = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      ingredients: {
        select: { ingredient: { select: { name: true } } },
      },
      author: { select: { username: true } },
    },
  });
  return recipes || [];
}
