import Ingredient, { TypeIngredient } from "../ui/Ingredient";
import { Badge } from "../ui/badge";

export default function Ingredients({
  ingredients,
}: {
  ingredients: TypeIngredient[];
}) {
  return (
    <section
      id="Ingredients"
      className="flex flex-col justify-center items-start gap-3 w-full"
    >
      <p className="text-base font-semibold tracking-widest">Ingredients</p>
      <div className="flex justify-start items-start gap-2 flex-wrap w-full">
        {ingredients.map((ingredient, index) => (
          <Ingredient key={index} props={ingredient} />
        ))}
      </div>
    </section>
  );
}
