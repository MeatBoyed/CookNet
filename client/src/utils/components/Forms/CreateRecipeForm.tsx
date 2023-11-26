"use client";
import { type Ingredient } from "@prisma/client";
import MaininfoEdit, { type MainInfo } from "../FormsElements/MaininfoEdit";
import StepsInput from "../FormsElements/StepsInput";
import { useState } from "react";
import { CreateRecipeEndPoint } from "~/utils/lib/EndPoints";
import { useRouter } from "next/navigation";
import Spinner from "../Loading";
import { useSession } from "next-auth/react";

interface props {
  ingredients: Ingredient[];
}

export interface RecipeFormData {
  mainInfo: MainInfo;
  steps: string[];
  recipeId?: string;
}

// States:
// Erros, Loading, Success

export default function CreateRecipeForm({ ingredients }: props) {
  const router = useRouter();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [mainInfo, setMainInfo] = useState<MainInfo>({
    title: "",
    description: "",
    ingredients: [],
    authorId: data?.user.id ?? "",
  });
  const [formData, setFormData] = useState<RecipeFormData>({
    mainInfo: mainInfo,
    steps: [],
  });

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      setIsLoading(true);

      // Ensure all properties are valid
      const valid = ValidateData(formData);
      if (!valid) return setErrorMessage(valid);

      // Your existing logic for creating the recipe goes here
      const res = await CreateRecipeEndPoint(formData);

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
          <p className="text-base font-normal leading-normal text-black">
            Go Back
          </p>
        </button>
        <button
          disabled={isLoading}
          onClick={() => handleSubmit()}
          className="flex items-center justify-center gap-2 border border-black bg-black px-5 py-2"
        >
          <p className="text-base font-normal leading-normal text-white">
            Create
          </p>
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

export const ValidateData = (formData: RecipeFormData) => {
  if (formData.steps.length == 0) return "You've forgotten to add Instructions";
  if (formData.mainInfo.title == "") return "Your Recipe needs a Title";
  if (formData.mainInfo.ingredients.length > 0 == false)
    return "You've forgotten to add Ingredients";

  return true;
};
