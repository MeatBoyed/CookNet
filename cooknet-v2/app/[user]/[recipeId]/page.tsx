import RecipeCard from "@/components/RecipeCard";

export default function Recipe() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 gap-10">
      {/* <Button>Hello See Me</Button> */}
      <h1 className="text-4xl font-extrabold tracking-widest text-center">
        Alien Cheese Burger
      </h1>

      <p>Details</p>

      <div className="flex justify-start items-center flex-wrap gap-5">
        <RecipeCard />
      </div>
    </main>
  );
}
