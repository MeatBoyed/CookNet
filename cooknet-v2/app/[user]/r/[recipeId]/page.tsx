import Image from "next/image";
import RecipeHeader from "@/components/Recipe/RecipeHeader";
import { RecipeActionButtons } from "@/components/Recipe/ActionButtons";
import Ingredients from "@/components/Recipe/Ingredients";
import Steps from "@/components/Recipe/Steps";
import CheeseBurger from "../../../../public/Alien Cheesburger.png";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { RedirectToSignIn, auth, currentUser } from "@clerk/nextjs";
import ImageCarousel from "@/components/ImageCarousel";

export default async function Recipe({
  params,
}: {
  params: { user: string; recipeId: string };
}) {
  const user = await currentUser();
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.recipeId, author: { username: params.user } },
    include: {
      likedBy: true,
      author: true,
    },
  });

  if (!recipe) return notFound();
  if (!user) return <RedirectToSignIn />;

  const userCookBook = await prisma.user.findUnique({
    where: { id: user?.id },
    select: { cookbook: true },
  });

  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <ImageCarousel images={recipe.images} />
      <RecipeHeader
        name={recipe.name}
        description={recipe.description}
        username={recipe.author.username}
        createdAt={recipe.createdDate}
      />
      <RecipeActionButtons
        userId={user?.id}
        recipeId={params.recipeId}
        username={params.user}
        isAuthor={user?.id === recipe.authorId}
        cookBook={userCookBook?.cookbook || []}
      />
      {/* <Ingredients ingredients={recipe.ingredients} />
        <Steps steps={recipe.steps} /> */}
    </div>
  );
}
