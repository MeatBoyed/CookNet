"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../Loading";
import RecipeCard, { type RecipeProp } from "../RecipeCard";
import { DeleteRecipe } from "~/app/recipe/create/EndPoints";
import { useSession } from "next-auth/react";

interface props {
  recipe: RecipeProp;
}

// States:
// Erros, Loading, Success

export default function DeleteRecipeForm({ recipe }: props) {
  const router = useRouter();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDelete = async () => {
    setErrorMessage("");
    try {
      console.log("running");
      setIsLoading(true);

      // Your existing logic for creating the recipe goes here
      const res = await DeleteRecipe(recipe.id);
      if (res.errorMessage != "") return setErrorMessage(res.errorMessage);
      if (res.id == "") return setIsSuccess(true);

      throw "Internal Error";
    } catch (error) {
      console.error("Error creating recipe:", error);
      setErrorMessage(
        "An error occurred while Deleting the recipe. Please try again.",
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
          {isSuccess ? (
            <div>
              <h1>Recipe Deleted Successfully</h1>
            </div>
          ) : (
            <div className="px-10">
              <RecipeCard recipe={recipe} />
            </div>
          )}
          <div className="flex items-center justify-center gap-5">
            {isSuccess ? (
              <button
                onClick={() => router.push(`/user/${data?.user.id}`)}
                className="flex items-center justify-center gap-2 border border-black bg-black p-2"
              >
                <p className="text-base font-normal leading-normal text-white">
                  View Cook Book
                </p>
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
