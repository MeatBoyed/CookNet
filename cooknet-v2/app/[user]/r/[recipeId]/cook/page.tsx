import Image from "next/image";
import ActionButtons, {
  CookActionButtons,
} from "@/components/Recipe/ActionButtons";
import Ingredients from "@/components/Recipe/Ingredients";
import RecipeHeader from "@/components/Recipe/RecipeHeader";
import Steps from "@/components/Recipe/Steps";
import CheeseBurger from "../../../../../public/Alien Cheesburger.png";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";

export default async function CookNet({
  params,
}: {
  params: { user: string; recipeId: string };
}) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: params.recipeId, author: { username: params.user } },
    include: {
      ingredients: { include: { ingredient: true } },
      likedBy: true,
      author: true,
    },
  });

  if (!recipe) return notFound();

  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-10 gap-10 lg:flex-row ">
      {/* <Image
        width={500}
        height={500}
        src={CheeseBurger}
        alt="Thumbnail"
        className="w-full"
      /> */}
      <div className="flex justify-center items-start flex-col gap-10">
        <RecipeHeader
          name={recipe.name}
          description={recipe.description}
          username={recipe.author.username}
          createdAt={recipe.createdDate}
        />
        <CookActionButtons recipeId={params.recipeId} username={params.user} />
        <Ingredients ingredients={recipe.ingredients} isCooking />
        <Steps steps={recipe.steps} isCooking={true} />
      </div>
    </main>
  );
}
