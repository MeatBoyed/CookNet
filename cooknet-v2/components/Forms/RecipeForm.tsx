"use client";

import ActionButtons from "../Recipe/ActionButtons";
import Image from "next/image";
import CheeseBurger from "../../public/Alien Cheesburger.png";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import IngredientsInputDialog from "./IngredientsInputDialog";
import Ingredients from "../Recipe/Ingredients";
import { useState } from "react";
import { TypeIngredient } from "../ui/Ingredient";
import StepsInput from "./StepsInput";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState<TypeIngredient[]>([]);

  return (
    <form className="flex min-h-screen flex-col items-start justify-between p-10 gap-10 lg:flex-row ">
      <ActionButtons />
      <Image
        width={500}
        height={500}
        src={CheeseBurger}
        alt="Thumbnail"
        className="w-full"
      />
      <div className="w-full flex justify-center items-start flex-col gap-10">
        <div className="w-full flex flex-col justify-center items-start gap-8">
          <div className="w-full flex justify-center items-start gap-2 flex-col">
            <Input
              type="text"
              id="Name"
              name="name"
              required
              placeholder="Alien Cheese Burger"
              className="text-2xl font-extrabold tracking-widest "
            />
            <Textarea
              id="Description"
              name="description"
              placeholder="Describe your Alien Cheese Burger"
              className="tracking-widest"
            />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col gap-5">
          <Ingredients ingredients={ingredients} />
          <IngredientsInputDialog
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </div>

        <StepsInput />
      </div>
    </form>
  );
}
