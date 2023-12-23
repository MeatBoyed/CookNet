import { object, z } from "zod";
import { Badge } from "./badge";
import { measurementSchema } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { Ingredient, IngredientOnRecipe } from "@prisma/client";
import { ToolTip } from "../ToolTip";

export type CombinedIngredient = {
  ingredient: {
    id: string;
    name: string;
    description: string | null;
    createdBy: string;
  };
} & {
  id: string;
  quantity: number;
  measurement: string;
  optional: boolean;
  ingredientId: string;
  recipeId: string;
};

interface IngredientIconProps {
  props: CombinedIngredient;
  isCooking?: boolean;
}

interface SelectIngredientIconProps {
  ingredient: Ingredient;
  selected: boolean;
}

export default function IngredientIcon({
  props,
  isCooking,
}: IngredientIconProps) {
  return (
    <Badge
      variant={"secondary"}
      className="flex justify-center items-center gap-2 p-3"
    >
      <div>
        {props.quantity}{" "}
        {props.measurement === "Of Item" ? "" : props.measurement}{" "}
        {props.ingredient.name} {props.optional && "(Optional)"}
      </div>
      {isCooking && <Checkbox />}
    </Badge>
  );
}

export function SelectIngredientIcon({
  ingredient,
  selected,
}: SelectIngredientIconProps) {
  return (
    <Badge
      variant={"secondary"}
      className={`flex justify-center items-center gap-2 p-3 rounded-sm hover:cursor-pointer ${
        selected && "bg-primary"
      }`}
    >
      <p>{ingredient.name}</p>
      <ToolTip message={`Created by: ${ingredient.createdBy}`} />
    </Badge>
  );
}
