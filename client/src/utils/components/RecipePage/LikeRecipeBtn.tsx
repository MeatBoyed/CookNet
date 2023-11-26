"use client";

import { type Like } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export function LikeRecipeBtn({
  likes,
  likedBy,
}: {
  likes: number;
  likedBy: Like[];
}) {
  const { data } = useSession();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(false);

  useEffect(() => {
    likedBy.find((like) => {
      if (like.userId == data?.user.id) {
        setIsLikedByUser(true);
      }
    });
  }, [data, likedBy]);

  const handleLikeRecipe = () => {
    setErrorMessage("");
    try {
      // Ensure user is Authed
      if (!data || !data.user)
        return setErrorMessage("Please Login to like the Recipe");

      // Your existing logic for creating the recipe goes here
      // const res = await UpdateSavedRecipes(data?.user.id);

      // console.log(res.data);
      // if (res.errorMessage != "") return setErrorMessage(res.errorMessage);
      // if (res.id != "") return router.push(`/recipe/${res.id}`);

      throw "Internal Error";
    } catch (error) {
      console.error("Error creating recipe:", error);
      setErrorMessage(
        "An error occurred while creating the recipe. Please try again.",
      );
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
          <FaHeart size={20} className="fill-red-500" />
        ) : (
          <FaRegHeart size={20} />
        )}
      </div>
    </div>
  );
}
