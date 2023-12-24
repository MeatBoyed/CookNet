import prisma from "@/lib/db";

export async function getRecipes() {
  return (
    (await prisma.recipe.findMany({
      include: {
        ingredients: {
          select: { ingredient: { select: { name: true } } },
        },
        author: { select: { username: true } },
      },
    })) || []
  );
}
export async function getRecipe(recipeId: string) {
  return (
    (await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: {
          select: { ingredient: { select: { name: true } } },
        },
        author: { select: { username: true } },
      },
    })) || []
  );
}
