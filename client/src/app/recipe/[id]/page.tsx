import { notFound } from "next/navigation";
import { db } from "~/server/db";
import Maininfo from "~/utils/components/RecipePage/MainInfo";
import { StepsRenderer } from "~/utils/components/RecipePage/Step";

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  // if (Buffer.byteLength(params.id, "utf-8") != 12) return notFound();
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
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <Maininfo
        recipe={recipe}
        ingredients={recipe.ingredients}
        author={recipe.author}
      />
      <StepsRenderer steps={recipe.steps} />
    </div>
  );
}
