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

  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <UserHeader
        profileImage={pageUser.profileImage}
        username={pageUser.username}
        favorites={favoritesCount}
        recipes={recipesCount}
      />

      <UserRecipeRender
        userId={user.id}
        recipes={recipes}
        username={user.username || ""}
        isAuth={pageUser.id == user.id}
      />
    </div>
  );
}
