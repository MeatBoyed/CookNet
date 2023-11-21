import Image from "next/image";
import ProfileThumbnail from "../../../img/ProfileThumbnail.png";
import ImageThumbnail from "../../../img/ImageThumbnail.png";
import { Ingredient, IngredientOnRecipe, Recipe, User } from "@prisma/client";

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
  console.log(ingredients);
  return (
    <div className="flex w-full flex-col justify-between gap-20">
      <Image
        className=""
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
        <div className="h-px w-[608px] bg-black" />

        <div className="flex flex-wrap items-center justify-start gap-1">
          {ingredients
            .sort((a, b) => a.ingredient.name.length - b.ingredient.name.length)
            .map((ingredient, index) => (
              <button
                key={index}
                className="mb-2 me-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
              >
                {ingredient.ingredient.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
