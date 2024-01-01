import RecipeFormInsta from "@/components/Forms/RecipeFormInsta";
import { RedirectToSignUp, auth, currentUser } from "@clerk/nextjs";

export default async function CreateRecipePage() {
  const user = await currentUser();

  if (!user) return <RedirectToSignUp />;

  // return <RecipeForm userId={user.id} username={user.username || ""} />;
  return (
    <RecipeFormInsta user={{ id: user.id, username: user.username || "" }} />
  );
}
