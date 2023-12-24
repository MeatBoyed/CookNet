"use client";

import Image from "next/image";
import CheeseBurger from "../../public/Alien Cheesburger.png";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import React, { useState } from "react";
import StepsInput from "./StepsInput";
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
import { EditActionButtons } from "../Recipe/ActionButtons";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CreateRecipeLoadingText } from "@/lib/utils";

interface props {
  userId: string;
  username: string;
  iRecipe?: Recipe;
  iIngredients?: IngredientOnRecipeOmit[];
}

export default function RecipeForm({
  userId,
  username,
  iRecipe,
  iIngredients,
}: props) {
  const [ingredients, setIngredients] = useState<IngredientOnRecipeOmit[]>(
    iIngredients || []
  );
  const [steps, setSteps] = useState<string[]>(
    iRecipe?.steps ? ["input", ...iRecipe.steps] : ["input"]
  );
  const [recipe, setRecipe] = useState<CreateRecipePayload>({
    authorId: iRecipe?.authorId || userId || "",
    name: iRecipe?.name || "",
    description: iRecipe?.description || "",
    image: iRecipe?.image || "",
    duration: iRecipe?.duration || 0, // in minutes
    steps: steps,
  });

  const router = useRouter();
  const { inputError, validateRecipe } = useRecipeValidation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  // Timer with little Afrikaans jokes
  // Halft-way - are you winning (Kom jy reg?)
  // 15min left - hoe far is jy?
  // 3min lef - Maak klaar
  // 1min left - is jy klaar

  const createRecipe = async () => {
    setErrorMessage(undefined);
    setLoading(true);
    const result = validateRecipe(recipe, steps, ingredients);

    if (!result) return setLoading(false);

    setRecipe((prev) => ({
      ...prev,
      image: "Image URL",
      steps: steps,
    }));

    const res = await CreateRecipe(recipe, ingredients);

    if (res.error) setErrorMessage(res.error);
    if (res.data) router.push(`/${username}/r/${res.data.id}`);
    setLoading(true);
  };

  const updateRecipe = async () => {
    setErrorMessage(undefined);
    setLoading(true);
    const result = validateRecipe(recipe, steps, ingredients);
    if (!result) return setLoading(false);

    setRecipe((prev) => ({
      ...prev,
      steps: steps,
    }));

    if (!iRecipe) {
      setErrorMessage("Please create this Recipe first");
      return setLoading(false);
    }
    const res = await UpdateRecipe(iRecipe.id, recipe, ingredients);

    if (res.error) setErrorMessage(res.error);
    if (res.data) router.push(`/${username}/r/${res.data.id}`);
    setLoading(false);
  };

  const deleteRecipe = async () => {
    setErrorMessage(undefined);
    setLoading(true);

    if (!iRecipe) {
      setLoading(false);
      return setErrorMessage("Please create this Recipe first");
    }
    const res = await DeleteRecipe(iRecipe.id);

    if (res.error) setErrorMessage(res.error);
    if (res.data) router.push(`/${username}/r`);
    setLoading(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex-col flex justify-center items-center gap-3">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
        <p className="text-md">
          {
            CreateRecipeLoadingText[
              Math.floor(Math.random() * CreateRecipeLoadingText.length)
            ]
          }
        </p>
      </div>
    );

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
