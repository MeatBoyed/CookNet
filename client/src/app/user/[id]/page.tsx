import { db } from "~/server/db";
import { notFound } from "next/navigation";

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await db.user.findUnique({
    where: { id: params.id },
    include: { Recipes: true },
  });

  if (!user) return notFound();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      User
      {/* <Maininfo
        recipe={recipe}
        ingredients={recipe.ingredients}
        author={recipe.author}
      />
      <StepsRenderer steps={recipe.steps} /> */}
    </div>
  );
}
