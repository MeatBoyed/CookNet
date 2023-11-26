"use client";

import { type Like } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LikeRecipe, UnLikeRecipe } from "~/utils/lib/UserEndPoints";

export function LikeRecipeBtn({
  likedBy,
  recipeId,
}: {
  likedBy: Like[];
  recipeId: string;
}) {
  const { data } = useSession();
  const router = useRouter();
  const [likes, setLikes] = useState<number>(likedBy.length);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(false);

  useEffect(() => {
    likedBy.find((like) => {
      if (like.userId == data?.user.id) setIsLikedByUser(true);
    });
  }, [data, likedBy]);

  const likeRecipe = async () => {
    setErrorMessage("");
    try {
      // Ensure user is Authed
      if (!data?.user) return router.push("/api/auth/signin");

      // Your existing logic for creating the recipe goes here
      const res = await LikeRecipe(data?.user.id, recipeId);

      if (res.errorMessage != "") throw new Error(res.errorMessage);
      setLikes((prev) => prev + 1);
    } catch (error) {
      console.error("Error creating recipe:", error);
      typeof error == "string"
        ? setErrorMessage(error)
        : setErrorMessage(
            "An error occurred while Adding Recipe to Cook Book. Please try again.",
          );
    } finally {
      setIsLikedByUser(true);
    }
  };

  const unlikeRecipe = async () => {
    setErrorMessage("");
    try {
      // Ensure user is Authed
      if (!data?.user) return router.push("/api/auth/signin");

      // Your existing logic for creating the recipe goes here
      const res = await UnLikeRecipe(data.user.id, recipeId);

      if (res.errorMessage != "") throw new Error(res.errorMessage);
      setLikes((prev) => prev - 1);
    } catch (error) {
      console.error("Error creating recipe:", error);
      typeof error == "string"
        ? setErrorMessage(error)
        : setErrorMessage(
            "An error occurred while liking Recipe to Cook Book. Please try again.",
          );
    } finally {
      setIsLikedByUser(false);
    }
  };

  return (
    <div>
      <p className="text-base font-normal leading-normal text-black">
        {errorMessage}
      </p>
      <div className="flex items-center justify-center gap-3">
        <p className="text-base font-normal leading-normal text-black">
          {likes}
        </p>

        {isLikedByUser ? (
          <FaHeart
            size={20}
            className="fill-red-500 hover:cursor-pointer"
            onClick={() => unlikeRecipe()}
          />
        ) : (
          <FaRegHeart
            size={20}
            className="hover:cursor-pointer"
            onClick={() => likeRecipe()}
          />
        )}
      </div>
    </div>
  );
}
