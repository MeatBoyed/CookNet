import Image from "next/image";
import RecipeHeader from "@/components/Recipe/RecipeHeader";
import ActionButtons, {
  RecipeActionButtons,
} from "@/components/Recipe/ActionButtons";
import Ingredients from "@/components/Recipe/Ingredients";
import Steps from "@/components/Recipe/Steps";
import CheeseBurger from "../../../../public/Alien Cheesburger.png";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { RedirectToSignIn, auth, currentUser } from "@clerk/nextjs";

export default async function Recipe({
  params,
}: {
  params: { user: string; recipeId: string };
}) {
  const user = await currentUser();
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.recipeId, author: { username: params.user } },
    include: {
      ingredients: { include: { ingredient: true } },
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
    <main className="flex min-h-screen flex-col items-start justify-between p-10 gap-10 lg:flex-row ">
      <Image
        width={320}
        height={320}
        src={CheeseBurger}
        alt="Thumbnail"
        className="w-80 self-center md:self-start"
      />
      <div className="w-full flex justify-center items-start flex-col gap-10">
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
        <Ingredients ingredients={recipe.ingredients} />
        <Steps steps={recipe.steps} />
      </div>
    </main>
  );
}
