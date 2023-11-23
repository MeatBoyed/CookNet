import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { db } from "~/server/db";
import DeleteRecipeForm from "~/utils/components/Forms/DeleteRecipeForm";

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default async function DeleteRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  const recipe = await db.recipe.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      ingredients: {
        include: { ingredient: true },
      },
    },
  });

  if (!recipe) return notFound();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  if (session.user.id != recipe.authorId) return notFound();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-10 ">
      <div className="flex w-full flex-col items-center justify-start gap-2">
        <h2 className="text-center text-3xl font-bold leading-normal text-black">
          Are you sure you want to delete this recipe?
        </h2>
        <p className="text-center text-base font-normal leading-normal text-black">
          Deleting this recipe will permanently remove it.
        </p>
      </div>
      <DeleteRecipeForm recipe={recipe} />
    </div>
  );
}
