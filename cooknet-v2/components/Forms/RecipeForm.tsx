"use client";

import ActionButtons from "../Recipe/ActionButtons";
import Image from "next/image";
import CheeseBurger from "../../public/Alien Cheesburger.png";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Ingredients from "../Recipe/Ingredients";
import React, { FormEvent, useState } from "react";
import StepsInput from "./StepsInput";
import { IngredientOnRecipe, Recipe } from "@prisma/client";
import { object, z } from "zod";
import { FormLabel } from "../ui/form";
import { ToolTip } from "../ToolTip";
import { Button } from "../ui/button";
import useRecipeValidation from "@/lib/useRecipeInputChecker";
import { Badge } from "../ui/badge";
import prisma from "@/lib/db";
import CreateIngredientDialog from "./CreateIngredientDialog";
import IngredientsInput, { IngredientOnRecipeOmit } from "../IngredientsInput";
import { CreateRecipe, CreateRecipePayload } from "@/app/actions/RecipesAction";

const formSchema = object({
  name: z.string(),
  description: z.string(),
});

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState<IngredientOnRecipeOmit[]>([]);
  const [steps, setSteps] = useState<string[]>(["input"]);
  const [recipe, setRecipe] = useState<CreateRecipePayload>({
    authorId: "Random User",
    name: "",
    description: "",
    image: "",
    duration: 0, // in minutes
    steps: steps,
  });

  const { inputError, validateRecipe } = useRecipeValidation();
  const [errroMessage, setErrorMessage] = useState<string | undefined>();

  // Timer with little Afrikaans jokes
  // Halft-way - are you winning (Kom jy reg?)
  // 15min left - hoe far is jy?
  // 3min lef - Maak klaar
  // 1min left - is jy klaar

  const createRecipe = async () => {
    setErrorMessage(undefined);
    // 1) Form validation
    // FormValues must be Present, At least 2 Steps added, At least 2 Ingredients
    const result = validateRecipe(recipe, steps, ingredients);

    if (!result) return;

    // 2) Add Extra Values
    // 3) Set Recipe (finish recipe state)
    // RecipeFormValues: Name, Description, Duration, Selected Ingredients, steps, Image (TODO)
    // Further Values: slug (Generate), AuthorId (Clerk),
    setRecipe((prev) => ({
      ...prev,
      authorId: "RandomUser",
      image: "Image URL",
      steps: steps,
    }));

    // 4) Create Recipe (server action)
    const res = await CreateRecipe(recipe, ingredients);

    if (res.error) return setErrorMessage(res.error);
    if (res.data) {
      console.log("HAZZAAAA!");
      console.log(res.data);

      return;
    }
  };

  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-between p-10 gap-10">
      <ActionButtons variant="Create" />
      <div className="w-full flex flex-col items-start justify-between gap-10 lg:flex-row">
        {/* Upload impage comp */}
        <Image
          width={500}
          height={500}
          src={CheeseBurger}
          alt="Thumbnail"
          className="w-full"
        />
        <Button onClick={createRecipe}>Create</Button>
        <p className="text-destructive text-base">
          {errroMessage && errroMessage}
        </p>

        <div className="w-full flex justify-center items-start flex-col gap-10">
          <div className="w-full flex flex-col justify-center items-start gap-8">
            <div className="w-full flex justify-center items-start gap-3 flex-col">
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <p className="text-sm font-semibold">Name</p>
                <Input
                  type="text"
                  id="Name"
                  name="name"
                  required
                  placeholder="Alien Cheese Burger"
                  className="text-2xl font-extrabold tracking-widest "
                  onChange={(e) =>
                    setRecipe((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <p className="text-destructive text-sm">
                  {inputError.name && inputError.name}
                </p>
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <p className="text-sm font-semibold">Description</p>
                <Textarea
                  id="Description"
                  name="description"
                  placeholder="Describe your Alien Cheese Burger"
                  className="tracking-widest"
                  onChange={(e) =>
                    setRecipe((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="w-full flex flex-col justify-center items-start gap-1">
                <p className="text-sm font-semibold">Duration</p>
                <Input
                  type="number"
                  id="Duration"
                  name="duration"
                  required
                  placeholder="35 min"
                  className="text-base tracking-widest "
                  onChange={(e) =>
                    setRecipe((prev) => ({
                      ...prev,
                      duration: parseFloat(e.target.value),
                    }))
                  }
                />
                <p className="text-destructive text-sm">
                  {inputError.duration && inputError.duration}
                </p>
              </div>
            </div>
          </div>

          <IngredientsInput
            selectedIngredients={ingredients}
            setSelectedIngredients={setIngredients}
            errorMessage={inputError.ingredients}
          />

          <StepsInput
            steps={steps}
            setSteps={setSteps}
            errorMessage={inputError.steps}
          />
        </div>
      </div>
    </div>
  );
}
