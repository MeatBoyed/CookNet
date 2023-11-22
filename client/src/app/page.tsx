import { db } from "~/server/db";
import CallToAction from "~/utils/components/CallToAction";
import CategoriesSection from "~/utils/components/CategoriesSelection";
import Header from "~/utils/components/Header";
import RecipeCard from "~/utils/components/RecipeCard";

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default async function Home() {
  const recipes = await db.recipe.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-8 ">
      <Header />
      <CategoriesSection />
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 ">
        {recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>
      {/* <CallToAction /> */}
    </div>
  );
}
