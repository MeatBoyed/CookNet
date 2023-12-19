import RecipeCard from "@/components/RecipeCard";
import UserHeader from "@/components/User/UserHeader";
import UserRecipeRender from "@/components/User/UserRecipeRender";

export default function User() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10 gap-10">
      <UserHeader />

      <UserRecipeRender />
      {/* <section
        id="Ingredients"
        className="flex flex-col justify-center items-start gap-3 w-full"
      >
        <p className="text-base font-semibold tracking-widest">Cook Book</p>
        <div className="">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </section> */}
    </main>
  );
}
