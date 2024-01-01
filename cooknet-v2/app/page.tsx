import RecipeCard from "@/components/RecipeCard";
import { getRecipes } from "./actions/lib/RecipeHandles";
import prisma from "@/lib/db";

export default async function Home() {
  // const recipes = await getRecipes();
  const recipes = await prisma.recipe.findMany({
    include: { author: { select: { username: true } } },
  });

  return (
    <main className="flex flex-col items-center justify-center p-10 gap-10">
      <h1 className="text-3xl font-extrabold tracking-widest text-center">
        Feast Your Eyes on Our Recipes
      </h1>

      <section
        id="Recipes"
        className="grid w-full grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-3 md:grid-cols-2"
      >
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            username={recipe.author.username}
          />
        ))}
      </section>
    </main>
  );
}
