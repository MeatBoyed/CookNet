import RecipeForm from "@/components/Forms/RecipeForm";
import { RedirectToSignUp, auth, currentUser } from "@clerk/nextjs";

export default async function CreateRecipePage() {
  const user = await currentUser();

  if (!user) return <RedirectToSignUp />;

  return <RecipeForm userId={user.id} username={user.username || ""} />;
}
