import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 gap-10">
      {/* <Button>Hello See Me</Button> */}
      <h1 className="text-4xl font-extrabold tracking-widest text-center">
        Today's Top Picks
      </h1>

      <section
        id="Recipes"
        className="grid w-full grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-3 md:grid-cols-2"
      >
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </section>
    </main>
  );
}
