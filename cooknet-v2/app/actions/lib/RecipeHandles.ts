import prisma from "@/lib/db";

export type QueriedRecipe = {
  author: {
    username: string;
  };
} & {
  id: string;
  name: string;
  description: string;
  images: string[];
  hours: number;
  minutes: number;
  createdDate: Date;
  updatedAt: Date;
  authorId: string;
};

export async function getRecipes() {
  return (
    (await prisma.recipe.findMany({
      include: {
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
        author: { select: { username: true } },
      },
    })) || []
  );
}
