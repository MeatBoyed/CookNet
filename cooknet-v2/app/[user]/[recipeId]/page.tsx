import RecipeCard from "@/components/RecipeCard";
import RecipeHeader from "@/components/Recipe/RecipeHeader";
import ActionButtons from "@/components/Recipe/ActionButtons";
import Ingredients from "@/components/Recipe/Ingredients";
import Steps from "@/components/Recipe/Steps";

export default function Recipe() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-10 gap-10">
      {/* <Button>Hello See Me</Button> */}
      <RecipeHeader />
      <ActionButtons />
      <Ingredients />
      <Steps />
    </main>
  );
}
