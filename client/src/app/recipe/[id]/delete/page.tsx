import { notFound } from "next/navigation";
import { db } from "~/server/db";
import RecipeCard from "~/utils/components/RecipeCard";
import Maininfo from "~/utils/components/RecipePage/MainInfo";
import { StepsRenderer } from "~/utils/components/RecipePage/Step";

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default async function DeleteRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await db.recipe.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      ingredients: {
        include: { ingredient: true },
      },
    },
  });

  if (!recipe) return notFound();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-10 ">
      <div className="flex w-full flex-col items-center justify-start gap-2">
        <h2 className="text-center text-3xl font-bold leading-normal text-black">
          Are you sure you want to delete this recipe?
        </h2>
        <p className="text-center text-base font-normal leading-normal text-black">
          Deleting this recipe will permanently remove it.
        </p>
      </div>
      <div className="px-10">
        <RecipeCard recipe={recipe} />
      </div>

      <div className="flex items-center justify-center gap-5">
        <button className="flex items-center justify-center gap-2 border border-black bg-black p-2">
          <p className="text-base font-normal leading-normal text-white">
            Delete
          </p>
        </button>
        <button className="flex items-center justify-center gap-2 border border-black bg-white p-2">
          <p className="text-base font-normal leading-normal text-black">
            Back
          </p>
        </button>
      </div>
    </div>
  );
}
