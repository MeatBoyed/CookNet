import { GetRecipeImage } from "@/app/actions/ImageActions";
import RecipeForm from "@/components/Forms/RecipeForm";
import RecipeFormInsta from "@/components/Forms/RecipeFormInsta";
import prisma from "@/lib/db";
import GetValidUser from "@/lib/useGetValUser";
import { RedirectToSignUp, currentUser } from "@clerk/nextjs";
import { notFound } from "next/navigation";

export default async function EditRecipePage({
  params,
}: {
  params: { user: string; recipeId: string };
}) {
  // const user = await currentUser();
  const user = await GetValidUser();
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.recipeId, author: { username: params.user } },
    include: {
      author: true,
    },
  });

  if (!recipe) return notFound();
  if (!user) return <RedirectToSignUp />;

  // const image = await GetRecipeImage(user.id, recipe.image);

  return (
    <RecipeFormInsta
      recipe={recipe}
      user={{ username: user.username || "", id: user.id }}
    />
  );
}
