import { currentUser, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import OnBoardingForm from "@/components/Forms/OnBoardingForm";

export default async function OnBoardingPage() {
  const user = await currentUser();

  // if (!isSignedIn) return router.push("/sign-in");
  if (!user) return redirect("sign-in");

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
