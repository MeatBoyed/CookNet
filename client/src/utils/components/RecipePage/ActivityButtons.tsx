"use client";
import { type Like, type Save } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { UpdateSavedRecipes } from "~/app/recipe/EndPoints";

interface props {
  likes: number;
  recipeId: string;
  LikedBy: Like[];
  SavedBy: Save[];
}
export default function ActivityButtons({
  recipeId,
  likes,
  LikedBy,
  SavedBy,
}: props) {
  const router = useRouter();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  //   LikedBy.map((like) => {
  //     if (like.userId == data?.user.id)
  //   })

  // TODO: Check if User has already Saved the Recipe (show correct UI)
  // TODO: Allow user to Add to Saved Recipes & show correct UI if successful

  // TODO: Check if User has already liked the Recipe (show correct UI)
  // TODO: Allow user to like the Recipe & show correct UI if successful

  const handleUpdateSaveRecipes = async () => {
    setErrorMessage("");
    try {
      setIsLoading(true);

      // Ensure user is Authed
      if (!data || !data.user) return setErrorMessage("Login");

      // Your existing logic for creating the recipe goes here
      const res = await UpdateSavedRecipes(data?.user.id, recipeId);

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
    <div className="flex w-full flex-col items-start justify-center gap-3">
      <p className="text-sm font-normal leading-normal text-black">
        Please login first
      </p>
      <div className="flex items-center justify-center gap-10">
        <button
          onClick={() => handleUpdateSaveRecipes()}
          className="flex w-full items-center justify-center gap-2 border border-black bg-black px-2 py-2"
        >
          <p className="text-sm font-normal leading-normal text-white">
            Add to Cook Book
          </p>
        </button>
        <div className="flex items-center justify-center gap-3">
          <p className="text-base font-normal leading-normal text-black">
            {likes}
          </p>

          <FaRegHeart size={20} />
        </div>
      </div>
    </div>
  );
}
