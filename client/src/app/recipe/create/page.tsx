import { db } from "~/server/db";
import CreateRecipeForm from "~/utils/components/Forms/CreateRecipeForm";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create Recipe - CookNet",
  description: "Create your Recipe. Just do it - CookNet",
};

export default async function CreatePage() {
  const ingredients = await db.ingredient.findMany();

  const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   redirect("/api/auth/signin");
  // }

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-10 ">
      <CreateRecipeForm ingredients={ingredients} />
    </div>
  );
}
