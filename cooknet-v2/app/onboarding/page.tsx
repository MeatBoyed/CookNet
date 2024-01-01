import { currentUser, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import OnBoardingForm from "@/components/Forms/OnBoardingForm";
import prisma from "@/lib/db";

export default async function OnBoardingPage() {
  // Use getValUser
  const user = await currentUser();

  // if (!isSignedIn) return router.push("/sign-in");
  if (!user) return redirect("sign-in");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (dbUser && (dbUser?.familyClan !== "" || dbUser?.referral !== ""))
    return redirect("/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 gap-10">
      <OnBoardingForm
        id={user.id}
        username={user.username || ""}
        profileImage={user.imageUrl}
      />
    </main>
  );
}
