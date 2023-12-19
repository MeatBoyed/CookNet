import Image from "next/image";
import RecipeCard from "@/components/RecipeCard";
import RecipeHeader from "@/components/Recipe/RecipeHeader";
import ActionButtons from "@/components/Recipe/ActionButtons";
import Ingredients from "@/components/Recipe/Ingredients";
import Steps from "@/components/Recipe/Steps";
import CheeseBurger from "../../../../public/Alien Cheesburger.png";
import { TypeIngredient } from "@/components/ui/Ingredient";

export default function Recipe() {
  const ingredients: TypeIngredient[] = [];
  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-10 gap-10 lg:flex-row ">
      {/* <Button>Hello See Me</Button> */}
      <Image
        width={500}
        height={500}
        src={CheeseBurger}
        alt="Thumbnail"
        className="w-full"
      />
      <div className="flex justify-center items-start flex-col gap-10">
        <RecipeHeader />
        <ActionButtons />
        <Ingredients ingredients={ingredients} />
        <Steps />
      </div>
    </main>
  );
}
