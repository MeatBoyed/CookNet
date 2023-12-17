import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 gap-10">
      {/* <Button>Hello See Me</Button> */}
      <h1 className="text-4xl font-extrabold tracking-widest text-center">
        Today's Top Picks
      </h1>

      <div className="flex justify-start items-center flex-wrap gap-5">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    </main>
  );
}
