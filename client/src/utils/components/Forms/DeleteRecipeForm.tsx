"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../Loading";
import { RecipeProp } from "../RecipeCard";
import { DeleteRecipe } from "~/app/recipe/create/EndPoints";

interface props {
  recipe: RecipeProp;
}

// States:
// Erros, Loading, Success

export default function DeleteRecipeForm({ recipe }: props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDelete = async () => {
    setErrorMessage("");
    try {
      setIsLoading(true);

      // Your existing logic for creating the recipe goes here
      const res = await DeleteRecipe(recipe.id);
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
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <Spinner />
          <h1>Updating your Cook Book</h1>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => handleDelete()}
              className="flex items-center justify-center gap-2 border border-black bg-black p-2"
            >
              <p className="text-base font-normal leading-normal text-white">
                Delete
              </p>
            </button>
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 border border-black bg-white p-2"
            >
              <p className="text-base font-normal leading-normal text-black">
                Back
              </p>
            </button>
          </div>
        </>
      )}
    </>
  );
}
