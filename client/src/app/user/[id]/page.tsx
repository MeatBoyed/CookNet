import { db } from "~/server/db";
import { notFound } from "next/navigation";
import UserHeader from "~/utils/components/User/UserHeader";
import RecipeCard from "~/utils/components/RecipeCard";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default async function UserPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: { id: params.id },
    include: { Recipes: true, savedRecipes: { include: { recipe: true } } },
  });

  if (!user) return notFound();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-8 py-10 ">
      <UserHeader
        name={user.name ?? "Image a Name"}
        followers={13}
        likes={30}
        noRecipes={user.Recipes.length}
      />

      {user.id == session?.user.id && (
        <section
          id="Favourites"
          className="flex w-full flex-col items-start justify-center gap-5"
        >
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-bold  text-black">Cook Book</p>
            <Link
              href={`/user/cookbook`}
              className="text-sm font-normal text-black"
            >
              View All
            </Link>
          </div>
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {user.savedRecipes.map((saved, index) => {
              if (index < 4)
                return <RecipeCard recipe={saved.recipe} key={index} />;
            })}
          </div>
        </section>
      )}
      <section
        id="CreatedRecipes"
        className="flex w-full flex-col items-start justify-center gap-5"
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-bold  text-black">Recipes</p>
          <Link
            href={`/user/recipes`}
            className="text-sm font-normal text-black"
          >
            View All
          </Link>
        </div>
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 ">
          {user.Recipes.map((recipe, index) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
