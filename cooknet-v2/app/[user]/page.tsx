import RecipeCard from "@/components/RecipeCard";
import UserHeader from "@/components/User/UserHeader";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function User() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10 gap-10">
      <UserHeader user={user} />

      {/* <UserRecipeRender /> */}
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
