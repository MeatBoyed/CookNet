import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import RecipeMetaData from "../RecipeMetaData";
import { Heart } from "lucide-react";

export default function RecipeHeader() {
  return (
    <section
      id="Header"
      className="flex flex-col justify-center items-start gap-2"
    >
      <div className="flex flex-col justify-center items-start gap-8">
        <RecipeMetaData />
        <div className="flex justify-center items-start gap-2 flex-col">
          <h1 className="text-4xl font-extrabold tracking-widest">
            Alien Cheese Burger
          </h1>
          <p className="">
            An alien cheese burger is a delicious and exotic dish that can be
            made with ingredients from other planets
          </p>
        </div>
      </div>
    </section>
  );
}
