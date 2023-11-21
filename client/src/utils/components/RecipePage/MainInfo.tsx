import Image from "next/image";
import ProfileThumbnail from "../../../img/ProfileThumbnail.png";
import ImageThumbnail from "../../../img/ImageThumbnail.png";
import {
  type Ingredient,
  IngredientOnRecipe,
  type Recipe,
  type User,
} from "@prisma/client";

interface props {
  recipe: Recipe;
  author: User;
  ingredients: ({
    ingredient: Ingredient;
  } & {
    quantity: number;
    measurement: string;
    optional: boolean;
    ingredientId: string;
    recipeId: string;
  })[];
}
export default function Maininfo({ recipe, author, ingredients }: props) {
  return (
    <div className="flex w-full flex-col justify-between gap-8 md:flex-row">
      <Image
        className="w-full"
        height={500}
        width={656}
        src={ImageThumbnail}
        alt="Recipe Thumbnail"
      />
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col items-start justify-start gap-3">
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-sm font-semibold text-black">Meal</p>
            <p className="text-3xl font-bold  text-black">{recipe.title}</p>
            <p className="text-base font-normal leading-normal text-black">
              {recipe.description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-1">
            <p className="text-sm font-semibold leading-[21px] text-black">
              Created By:
            </p>
            <p className="text-sm font-normal leading-[21px] text-black">
              {author.name}
            </p>
          </div>
        </div>
        <div className="h-px w-full bg-black" />

        <div className="flex flex-col items-start justify-start gap-2">
          <p className="text-sm font-semibold text-black">Ingredients</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ingredients
              .sort(
                (a, b) => a.ingredient.name.length - b.ingredient.name.length,
              )
              .map((ingredient, index) => (
                <button
                  key={index}
                  className="rounded border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                >
                  {ingredient.quantity} {ingredient.ingredient.name}{" "}
                  {ingredient.measurement} {ingredient.optional && "(Optional)"}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
