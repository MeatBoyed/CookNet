import RecipeCard from "@/components/RecipeCard";
import prisma from "@/lib/db";

export default async function Home() {
  const recipes = await prisma.recipe.findMany({
    include: {
      author: { select: { username: true } },
      ingredients: {
        take: 4,
        include: {
          ingredient: { select: { name: true } },
        },
      },
    },
  });

  const ingredientNames: string[] = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.map((ingre) => {
      ingredientNames.push(ingre.ingredient.name);
    });
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 gap-10">
      {/* <Button>Hello See Me</Button> */}
      <h1 className="text-4xl font-extrabold tracking-widest text-center">
        Today&#39;s Top Picks
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
            ingredients={ingredientNames}
            likes={30}
          />
        ))}
      </section>
    </main>
  );
}
