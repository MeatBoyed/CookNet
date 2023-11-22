"use client";
import { type Ingredient } from "@prisma/client";
import MaininfoEdit, { type MainInfo } from "../FormsElements/MaininfoEdit";
import StepsInput from "../FormsElements/StepsInput";
import { useState } from "react";
import { CreateRecipeEndPoint } from "~/app/recipe/create/EndPoints";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import Spinner from "../Loading";

interface props {
  ingredients: Ingredient[];
}

export interface RecipeFormData {
  mainInfo: MainInfo;
  steps: string[];
}

// States:
// Erros, Loading, Success

export default function CreateRecipeForm({ ingredients }: props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<RecipeFormData>({
    mainInfo: { description: "", ingredients: [], title: "", authorId: "" },
    steps: [],
  });

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      setIsLoading(true);
      // Ensure all properties are valid
      if (formData.steps.length == 0)
        return setErrorMessage("You've forgotten to add Instructions");
      if (formData.mainInfo.title == "")
        return setErrorMessage("Your Recipe needs a Title");
      if (formData.mainInfo.ingredients.length > 0 == false)
        setErrorMessage("You've forgotten to add Ingredients");

      // Your existing logic for creating the recipe goes here
      const res = await CreateRecipeEndPoint(formData);
      if (res.errorMessage == "" && res.id != "") {
        return router.push(`/recipe/${res.id}`);
      }
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
            Create
          </div>
        </button>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <Spinner />
          <h1>Updating your Cook Cook</h1>
        </div>
      ) : (
        <>
          <MaininfoEdit
            onChange={(newMainInfo) =>
              setFormData((prev) => ({ ...prev, mainInfo: newMainInfo }))
            }
            ingredients={ingredients}
          />
          <StepsInput steps={formData.steps} setFormData={setFormData} />
        </>
      )}
    </>
  );
}
