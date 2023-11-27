import { db } from "~/server/db";
import { notFound } from "next/navigation";
import CookMaininfo from "~/utils/components/RecipePage/CookMainInfo";
import { StepsRenderer } from "~/utils/components/RecipePage/Step";

export const metadata = {
  title: "Create Recipe - CookNet",
  description: "Create your Recipe. Just do it - CookNet",
};

export default async function CookPage({ params }: { params: { id: string } }) {
  const recipe = await db.recipe.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      ingredients: {
        include: { ingredient: true },
      },
      savedBy: true,
      likedBy: true,
    },
  });

  if (!recipe) return notFound();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <CookMaininfo
        recipe={recipe}
        ingredients={recipe.ingredients}
        author={recipe.author}
        SavedBy={recipe.savedBy}
        LikedBy={recipe.likedBy}
      />
      <StepsRenderer steps={recipe.steps} isCooking={true} expand={true} />
    </div>
  );
}
