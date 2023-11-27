import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import RecipeCard from "~/utils/components/RecipeCard";

export const metadata = {
  title: "Your Cook Book - CookNet",
  description: "View your Cook Book",
};

export default async function CookBookPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/api/auth/signin");

  const cookBook = await db.save.findMany({
    where: { userId: session.user.id },
    include: { recipe: true },
  });

  return (
    <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-8 ">
      <p className="text-xl font-bold  text-black">
        {session.user.name
          ? session.user.name?.charAt(0).toUpperCase() +
            session.user.name?.slice(1) +
            "' "
          : "Your "}
        Cook Book
      </p>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 ">
        {cookBook.map((save, index) => (
          <RecipeCard recipe={save.recipe} key={index} />
        ))}
      </div>
    </div>
  );
}
