import Head from "next/head";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import Footer from "~/utils/components/Footer";
import Navbar from "~/utils/components/Navbar";
import Maininfo from "~/utils/components/RecipePage/MainInfo";
import StepCard from "~/utils/components/RecipePage/StepCard";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  // if (Buffer.byteLength(params.id, "utf-8") != 12) return notFound();
  const recipe = await db.recipe.findUnique({
    where: { id: params.id },
    include: { author: true, ingredients: { include: { ingredient: true } } },
  });

  if (!recipe) return notFound();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <Maininfo
        recipe={recipe}
        ingredients={recipe.ingredients}
        author={recipe.author}
      />
      <div className="mt-10 flex flex-wrap items-start justify-center gap-5 ">
        {recipe.steps.map((step, index) => (
          <StepCard step={step} key={index} stepNo={index + 1} />
        ))}
      </div>
    </div>
  );
}
