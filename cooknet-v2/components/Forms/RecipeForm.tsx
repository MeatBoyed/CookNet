"use client";

import Image from "next/image";
import CheeseBurger from "../../public/Alien Cheesburger.png";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import React, { useState } from "react";
import StepsInput from "./StepsInput";
import { object, z } from "zod";
import { Button } from "../ui/button";
import useRecipeValidation from "@/lib/useRecipeInputChecker";
import IngredientsInput, { IngredientOnRecipeOmit } from "../IngredientsInput";
import {
  CreateRecipe,
  CreateRecipePayload,
  DeleteRecipe,
  UpdateRecipe,
} from "@/app/actions/RecipesAction";
import { Recipe } from "@prisma/client";
import { redirect } from "next/navigation";
import { EditActionButtons } from "../Recipe/ActionButtons";
import { useRouter } from "next/navigation";
import { RedirectToSignUp, useUser } from "@clerk/nextjs";

interface props {
  iRecipe?: Recipe;
  iIngredients?: IngredientOnRecipeOmit[];
}

export default function RecipeForm({ iRecipe, iIngredients }: props) {
  const { user } = useUser();

  if (!user) return <RedirectToSignUp />;

  const [ingredients, setIngredients] = useState<IngredientOnRecipeOmit[]>(
    iIngredients || []
  );
  const [steps, setSteps] = useState<string[]>(
    iRecipe?.steps ? ["input", ...iRecipe.steps] : ["input"]
  );
  const [recipe, setRecipe] = useState<CreateRecipePayload>({
    authorId: iRecipe?.authorId || user.id || "",
    name: iRecipe?.name || "",
    description: iRecipe?.description || "",
    image: iRecipe?.image || "",
    duration: iRecipe?.duration || 0, // in minutes
    steps: steps,
  });

  const router = useRouter();
  const { inputError, validateRecipe } = useRecipeValidation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

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
      image: "Image URL",
      steps: steps,
    }));

    // 4) Create Recipe (server action)
    const res = await CreateRecipe(recipe, ingredients);

    if (res.error) return setErrorMessage(res.error);
    if (res.data) return router.push(`/${user.username}/r/${res.data.id}`);
  };

  const updateRecipe = async () => {
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
      steps: steps,
    }));

    // 4) Create Recipe (server action)
    if (!iRecipe) return setErrorMessage("Please create this Recipe first");
    const res = await UpdateRecipe(iRecipe.id, recipe, ingredients);

    if (res.error) return setErrorMessage(res.error);
    if (res.data) return router.push(`/${user.username}/r/${res.data.id}`);
  };

  const deleteRecipe = async () => {
    setErrorMessage(undefined);

    // 4) Create Recipe (server action)
    if (!iRecipe) return setErrorMessage("Please create this Recipe first");
    const res = await DeleteRecipe(iRecipe.id);

    if (res.error) return setErrorMessage(res.error);
    if (res.data) return router.push(`/${user.username}/r`);
  };

  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-between p-10 gap-10">
      <div className="w-full flex flex-col items-start justify-between gap-10 lg:flex-row">
        {/* Upload image comp */}
        <Image
          width={300}
          height={300}
          src={CheeseBurger}
          alt="Thumbnail"
          className="self-center"
        />

        <div className="w-full flex justify-center items-start flex-col gap-10">
          <div className="w-full flex justify-center items-start gap-3 flex-col">
            <p className="text-destructive text-base">
              {errorMessage && errorMessage}
            </p>
            {iRecipe ? (
              <EditActionButtons
                username={"Rando"}
                handleUpdate={updateRecipe}
                handleDelete={deleteRecipe}
              />
            ) : (
              <Button onClick={createRecipe} className="w-full">
                Create
              </Button>
            )}
            <div className="w-full flex flex-col justify-center items-start gap-1">
              <p className="text-sm font-semibold">Name</p>
              <Input
                type="text"
                id="Name"
                name="name"
                required
                placeholder="Alien Cheese Burger"
                className="text-2xl font-extrabold tracking-widest "
                value={recipe.name}
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
                value={recipe.description}
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
                value={recipe.duration}
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
