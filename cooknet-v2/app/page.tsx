import RecipeCard from "@/components/RecipeCard";
import { getRecipes } from "./actions/lib/RecipeHandles";

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 gap-10">
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
            name={recipe.name}
            recipeId={recipe.id}
            createdAt={recipe.createdDate}
            description={recipe.description}
            username={recipe.author.username}
            ingredientsObj={recipe.ingredients}
            likes={30}
          />
        ))}
      </section>
    </main>
  );
}
