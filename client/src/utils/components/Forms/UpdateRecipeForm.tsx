"use client";
import { type Ingredient } from "@prisma/client";
import MaininfoEdit, { type MainInfo } from "../FormsElements/MaininfoEdit";
import StepsInput from "../FormsElements/StepsInput";
import { useEffect, useState } from "react";
import { UpdateRecipe } from "~/app/recipe/create/EndPoints";
import { useRouter } from "next/navigation";
import Spinner from "../Loading";
import { useSession } from "next-auth/react";
import { type RecipeWithDetails } from "~/app/recipe/[id]/edit/page";
import { type RecipeFormData, ValidateData } from "./CreateRecipeForm";

interface props {
  recipe: RecipeWithDetails;
  ingredients: Ingredient[];
}

export default function UpdateRecipeForm({ recipe, ingredients }: props) {
  const router = useRouter();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [mainInfo, setMainInfo] = useState<MainInfo>({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    authorId: recipe.author.id,
  });
  const [formData, setFormData] = useState<RecipeFormData>({
    mainInfo: mainInfo,
    steps: recipe.steps,
    recipeId: recipe.id,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, mainInfo: mainInfo }));
  }, [mainInfo]);

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      setIsLoading(true);

      // Ensure all properties are valid
      const valid = ValidateData(formData);
      if (!valid) return setErrorMessage(valid);

      // Your existing logic for creating the recipe goes here
      const res = await UpdateRecipe(formData);

      if (res.errorMessage != "") return setErrorMessage(res.errorMessage);
      if (res.id != "") return router.push(`/recipe/${res.id}`);

      throw "Internal Error";
    } catch (error) {
      console.error("Error creating recipe:", error);
      setErrorMessage(
        "An error occurred while creating the recipe. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {errorMessage}
      <div className="flex w-full items-start justify-between gap-4 ">
        <button
          disabled={isLoading}
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 border border-black px-5 py-2"
        >
          <div className="text-base font-normal leading-normal text-black">
            Go Back
          </div>
        </button>
        <button
          disabled={isLoading}
          onClick={() => handleSubmit()}
          className="flex items-center justify-center gap-2 border border-black bg-black px-5 py-2"
        >
          <div className="text-base font-normal leading-normal text-white">
            Update
          </div>
        </button>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <Spinner />
          <h1>Updating your Cook Book</h1>
        </div>
      ) : (
        <>
          <MaininfoEdit
            mainInfo={mainInfo}
            setMainInfo={setMainInfo}
            ingredients={ingredients}
          />
          <StepsInput steps={formData.steps} setFormData={setFormData} />
        </>
      )}
    </>
  );
}
