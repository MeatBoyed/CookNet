import { Ingredient, IngredientOnRecipe } from "@prisma/client";
import IngredientIcon, { CombinedIngredient } from "../ui/IngredientIcon";

export default function Ingredients({
  ingredients,
  isCooking,
  errorMessage,
}: {
  ingredients: CombinedIngredient[];
  isCooking?: boolean;
  errorMessage?: string;
}) {
  return (
    <section
      id="Ingredients"
      className="flex flex-col justify-center items-start gap-3 w-full"
    >
      <div className="flex flex-col justify-center items-start">
        <p className="text-base font-semibold tracking-widest">Ingredients</p>
        <p className="text-destructive text-sm">
          {errorMessage && errorMessage}
        </p>
      </div>
      <div className="flex justify-start items-start gap-2 flex-wrap w-full">
        {ingredients.map((ingredient, index) => (
          <IngredientIcon
            key={index}
            props={ingredient}
            isCooking={isCooking}
          />
        ))}
      </div>
    </section>
  );
}
