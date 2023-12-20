import Image from "next/image";
import ActionButtons from "@/components/Recipe/ActionButtons";
import Ingredients from "@/components/Recipe/Ingredients";
import RecipeHeader from "@/components/Recipe/RecipeHeader";
import Steps from "@/components/Recipe/Steps";
import { TypeIngredient } from "@/components/ui/Ingredient";
import CheeseBurger from "../../../../../public/Alien Cheesburger.png";

export default function CookNet() {
  const ingredients: TypeIngredient[] = [
    {
      name: "Hello",
      measurement: "Cup",
      quantity: 3,
    },
    {
      name: "Hello",
      measurement: "Cup",
      quantity: 3,
      optional: "yes",
    },
    {
      name: "Hello",
      measurement: "Cup",
      quantity: 3,
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-10 gap-10 lg:flex-row ">
      <Image
        width={500}
        height={500}
        src={CheeseBurger}
        alt="Thumbnail"
        className="w-full"
      />
      <div className="flex justify-center items-start flex-col gap-10">
        <RecipeHeader />
        <ActionButtons variant="Cook" />
        <Ingredients ingredients={ingredients} isCooking />
        <Steps isCooking={true} />
      </div>
    </main>
  );
}
