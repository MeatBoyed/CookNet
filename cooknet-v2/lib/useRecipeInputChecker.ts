import { CreateRecipePayload } from "@/app/actions/RecipesAction";
import { IngredientOnRecipeOmit } from "@/components/IngredientsInput";
import { Recipe } from "@prisma/client";
import { useState } from "react";

const useRecipeValidation = () => {
  const [inputError, setInputError] = useState<{
    name?: string;
    duration?: string;
    steps?: string;
    ingredients?: string;
  }>({
    name: undefined,
    duration: undefined,
    steps: undefined,
    ingredients: undefined,
  });

  const validateRecipe = (
    recipe: CreateRecipePayload,
    steps: string[],
    ingredients: IngredientOnRecipeOmit[]
  ) => {
    if (recipe.name === "" || recipe.name.trim() === "") {
      setInputError((prev) => ({
        ...prev,
        name: "Please enter a Name for your Recipe",
      }));
    } else {
      setInputError((prev) => ({ ...prev, name: undefined }));
    }

    if (recipe.duration < 5) {
      setInputError((prev) => ({
        ...prev,
        duration: "Please enter a duration greater than 5min",
      }));
    } else {
      setInputError((prev) => ({ ...prev, duration: undefined }));
    }

    if (ingredients.length < 2) {
      setInputError((prev) => ({
        ...prev,
        ingredients: "Please select at least 2 Ingredients",
      }));
    } else {
      setInputError((prev) => ({ ...prev, ingredients: undefined }));
    }

    if (steps.length < 3) {
      setInputError((prev) => ({
        ...prev,
        steps: "Please enter at least 2 Steps",
      }));
    } else {
      setInputError((prev) => ({ ...prev, steps: undefined }));
    }

    if (
      inputError.name == undefined ||
      inputError.duration == undefined ||
      inputError.ingredients == undefined ||
      inputError.steps == undefined
    )
      return true;
    return false;
  };

  return { inputError, validateRecipe };
};

export default useRecipeValidation;
