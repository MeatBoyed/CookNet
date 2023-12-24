import RecipeCard from "@/components/RecipeCard";
import UserHeader from "@/components/User/UserHeader";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import {
  GetRecipeCookBook,
  GetUsersRecipes,
  getFavoritesCount,
  getRecipesCount,
} from "../actions/lib/UserHandles";
import UserRecipeRender from "@/components/User/UserRecipeRender";

export default async function User({ params }: { params: { user: string } }) {
  const user = await currentUser();
  const pageUser = await prisma.user.findUnique({
    where: { username: params.user },
    select: { id: true, username: true, profileImage: true },
  });

  if (!user) redirect("/sign-in");
  if (user.username == params.user && !pageUser) return redirect("/onboarding");
  if (!pageUser) return notFound();

  const favoritesCount = await getFavoritesCount(pageUser.id);
  const recipesCount = await getRecipesCount(pageUser.id);

  const recipes = await GetUsersRecipes(pageUser.id);
  const cookBook = await GetRecipeCookBook(pageUser.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10 gap-10">
      <UserHeader
        profileImage={pageUser.profileImage}
        username={pageUser.username}
        favorites={favoritesCount}
        recipes={recipesCount}
      />

      <UserRecipeRender
        username={user.username || ""}
        recipes={recipes}
        cookBook={cookBook}
        isAuth={pageUser.id == user.id}
      />
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
