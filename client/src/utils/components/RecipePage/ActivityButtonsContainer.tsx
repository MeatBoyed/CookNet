import { type Like, type Save } from "@prisma/client";
import { SaveRecipeBtn } from "./SaveRecipeBtn";
import { LikeRecipeBtn } from "./LikeRecipeBtn";
import Link from "next/link";

interface props {
  recipeId: string;
  likedBy: Like[];
  savedBy: Save[];
}
export default function ActivityButtonsContainer({
  recipeId,
  likedBy,
  savedBy,
}: props) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-3">
      <div className="flex w-full items-center justify-start gap-3">
        <Link
          href={`/recipe/${recipeId}/cook`}
          className="flex items-center justify-center gap-2 border border-black bg-black px-2 py-2"
        >
          <p className="text-sm font-normal leading-normal text-white">
            CookNet
          </p>
        </Link>
        <SaveRecipeBtn savedBy={savedBy} recipeId={recipeId} />
        <LikeRecipeBtn likedBy={likedBy} recipeId={recipeId} />
      </div>
    </div>
  );
}
