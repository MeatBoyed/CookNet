import RecipeCard from "@/components/RecipeCard";
import RecipeHeader from "@/components/RecipeHeader";

export default function Recipe() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 gap-10">
      {/* <Button>Hello See Me</Button> */}
      <RecipeHeader />

      {/* <div className="flex justify-start items-center flex-wrap gap-5">
        <RecipeCard />
      </div> */}
    </main>
  );
}
