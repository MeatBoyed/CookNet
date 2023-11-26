import { type Like, type Save } from "@prisma/client";
import { SaveRecipeBtn } from "./SaveRecipeBtn";
import { LikeRecipeBtn } from "./LikeRecipeBtn";

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
      <div className="flex items-center justify-center gap-10">
        <SaveRecipeBtn savedBy={savedBy} recipeId={recipeId} />
        <LikeRecipeBtn likedBy={likedBy} recipeId={recipeId} />
      </div>
    </div>
  );
}
