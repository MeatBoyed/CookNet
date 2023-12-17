import CheeseBurger from "../public/Alien Cheesburger.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import RecipeMetaData from "./RecipeMetaData";
import { Heart } from "lucide-react";

export default function RecipeHeader() {
  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <Image src={CheeseBurger} alt="Thumbnail" className="w-full" />
      <RecipeMetaData />
      <div className="flex flex-col justify-center items-start gap-8">
        <div className="flex justify-center items-center gap-2 flex-col">
          <h1 className="text-4xl font-extrabold tracking-widest text-center">
            Alien Cheese Burger
          </h1>
          <p className="">
            An alien cheese burger is a delicious and exotic dish that can be
            made with ingredients from other planets
          </p>
        </div>

        <div className="flex justify-center items-center gap-3">
          <Button>CookNet</Button>
          <Button variant={"outline"}>Add to CookBook</Button>
          <div className="flex justify-center items-center gap-1">
            <Heart size={25} className="text-red-500" />
            <p className="text-lg text-center">3</p>
          </div>
        </div>

        {/* Seperation */}
        <div className="flex justify-start items-start gap-2 flex-wrap">
          <Badge variant={"secondary"} className="p-3">
            6 Large Eggs
          </Badge>
          <Badge variant={"secondary"} className="p-3">
            Beef Patty
          </Badge>
          <Badge variant={"secondary"} className="p-3">
            Beef Patty
          </Badge>
          <Badge variant={"secondary"} className="p-3">
            Beef Patty
          </Badge>
        </div>

        {/* Display Steps in component */}
      </div>
    </div>
  );
}
