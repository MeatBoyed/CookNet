import Ingredient from "../ui/Ingredient";
import { Badge } from "../ui/badge";

export default function Ingredients() {
  return (
    <section
      id="Ingredients"
      className="flex flex-col justify-center items-start gap-3 w-full"
    >
      <p className="text-base font-semibold tracking-widest">Ingredients</p>
      <div className="flex justify-start items-start gap-2 flex-wrap w-full">
        <Ingredient name="Large Eggs" quantity={3} />
        <Ingredient name="Large Eggs" quantity={3} optional />
        <Ingredient name="Large Eggs" quantity={3} />
        <Ingredient name="Large Eggs" quantity={3} />
        <Ingredient name="Large Eggs" quantity={3} />
        <Ingredient name="Large Eggs" quantity={3} />
        <Ingredient name="Large Eggs" quantity={3} />
        <Ingredient name="Large Eggs" quantity={3} />
      </div>
    </section>
  );
}
