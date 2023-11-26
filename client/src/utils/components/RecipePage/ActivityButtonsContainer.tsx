"use client";
import { type Like, type Save } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SaveRecipeBtn } from "./SaveRecipeBtn";
import { LikeRecipeBtn } from "./LikeRecipeBtn";

interface props {
  likes: number;
  recipeId: string;
  likedBy: Like[];
  savedBy: Save[];
}
export default function ActivityButtonsContainer({
  recipeId,
  likes,
  likedBy,
  savedBy,
}: props) {
  //   LikedBy.map((like) => {
  //     if (like.userId == data?.user.id)
  //   })

  // TODO: Check if User has already Saved the Recipe (show correct UI)
  // TODO: Allow user to Add to Saved Recipes & show correct UI if successful

  // TODO: Check if User has already liked the Recipe (show correct UI)
  // TODO: Allow user to like the Recipe & show correct UI if successful

  return (
    <div className="flex w-full flex-col items-start justify-center gap-3">
      <div className="flex items-center justify-center gap-10">
        <SaveRecipeBtn savedBy={savedBy} recipeId={recipeId} />
        <LikeRecipeBtn likedBy={likedBy} likes={likes} />
      </div>
    </div>
  );
}
