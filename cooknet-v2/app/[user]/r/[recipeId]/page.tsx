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

export default async function Recipe({
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
      {/* <Button>Hello See Me</Button> */}
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
          recipeId={params.recipeId}
          username={params.user}
        />
        <Ingredients ingredients={recipe.ingredients} />
        <Steps steps={recipe.steps} />
      </div>
    </main>
  );
}
