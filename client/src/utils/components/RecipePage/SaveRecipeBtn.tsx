"use client";

import { type Save } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RemoveRecipeFromSaved,
  UpdateSavedRecipes,
} from "~/utils/lib/UserEndPoints";

export function SaveRecipeBtn({
  savedBy: savedBy,
  recipeId,
}: {
  savedBy: Save[];
  recipeId: string;
}) {
  const { data } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSavedByUser, setIsSavedByUser] = useState<boolean>(false);

  useEffect(() => {
    savedBy.find((saved) => {
      if (saved.userId == data?.user.id) setIsSavedByUser(true);
    });
  }, [data, savedBy]);

  const saveRecipe = async () => {
    setErrorMessage("");
    try {
      setIsLoading(true);

      // Ensure user is Authed
      if (!data?.user) return router.push("/api/auth/signin");

      // Your existing logic for creating the recipe goes here
      const res = await UpdateSavedRecipes(data?.user.id, recipeId);

      if (res.errorMessage != "") throw new Error(res.errorMessage);
    } catch (error) {
      console.error("Error creating recipe:", error);
      typeof error == "string"
        ? setErrorMessage(error)
        : setErrorMessage(
            "An error occurred while Adding Recipe to Cook Book. Please try again.",
          );
    } finally {
      setIsSavedByUser(true);
      setIsLoading(false);
    }
  };

  const removeRecipe = async () => {
    setErrorMessage("");
    try {
      setIsLoading(true);

      // Ensure user is Authed
      if (!data?.user) return router.push("/api/auth/signin");

      // Your existing logic for creating the recipe goes here
      const res = await RemoveRecipeFromSaved(data.user.id, recipeId);

      if (res.errorMessage != "") throw new Error(res.errorMessage);
    } catch (error) {
      console.error("Error creating recipe:", error);
      typeof error == "string"
        ? setErrorMessage(error)
        : setErrorMessage(
            "An error occurred while Removing Recipe to Cook Book. Please try again.",
          );
    } finally {
      setIsSavedByUser(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="text-base font-normal leading-normal text-black">
        {errorMessage}
      </p>
      <button
        onClick={() => (isSavedByUser ? removeRecipe() : saveRecipe())}
        className="flex w-full items-center justify-center gap-2 border border-black bg-black px-2 py-2"
      >
        <p className="text-sm font-normal leading-normal text-white">
          {isLoading ? (
            "Saving..."
          ) : (
            <>{isSavedByUser ? "Remove from Cook Book" : "Add to Cook Book"}</>
          )}
        </p>
      </button>
    </div>
  );
}
