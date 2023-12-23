import RecipeForm from "@/components/Forms/RecipeForm";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditRecipePage({
  params,
}: {
  params: { user: string; recipeId: string };
}) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.recipeId, author: { username: params.user } },
    include: {
      ingredients: {
        select: {
          id: true,
          ingredientId: true,
          measurement: true,
          optional: true,
          quantity: true,
        },
      },
      author: true,
    },
  });

  if (!recipe) return notFound();

  return <RecipeForm iRecipe={recipe} iIngredients={recipe.ingredients} />;
}
