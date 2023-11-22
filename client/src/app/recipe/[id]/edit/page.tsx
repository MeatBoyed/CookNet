import { db } from "~/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { notFound, redirect } from "next/navigation";
import { type IngredientOnRecipe, type User } from "@prisma/client";
import UpdateRecipeForm from "~/utils/components/Forms/UpdateRecipeForm";

export const metadata = {
  title: "Create Recipe - CookNet",
  description: "Create your Recipe. Just do it - CookNet",
};

export type RecipeWithDetails = {
  id: string;
  title: string;
  description: string;
  author: User;
  steps: string[];
  ingredients: IngredientOnRecipe[];
};

export default async function CreatePage({
  params,
}: {
  params: { id: string };
}) {
  const recipe: RecipeWithDetails | null = await db.recipe.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      ingredients: {
        include: { ingredient: true },
      },
    },
  });
  const ingredients = await db.ingredient.findMany();

  const session = await getServerSession(authOptions);

  if (!recipe) return notFound();

  // Ensure user is authed
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  if (session.user.id != recipe.author.id) return notFound();

  if (session.user)
    return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-10 ">
        <UpdateRecipeForm recipe={recipe} ingredients={ingredients} />
      </div>
    );
}
