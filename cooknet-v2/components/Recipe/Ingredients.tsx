import Ingredient, { TypeIngredient } from "../ui/Ingredient";

export default function Ingredients({
  ingredients,
  isCooking,
}: {
  ingredients: TypeIngredient[];
  isCooking?: boolean;
}) {
  return (
    <section
      id="Ingredients"
      className="flex flex-col justify-center items-start gap-3 w-full"
    >
      <p className="text-base font-semibold tracking-widest">Ingredients</p>
      <div className="flex justify-start items-start gap-2 flex-wrap w-full">
        {ingredients.map((ingredient, index) => (
          <Ingredient key={index} props={ingredient} isCooking={isCooking} />
        ))}
      </div>
    </section>
  );
}
