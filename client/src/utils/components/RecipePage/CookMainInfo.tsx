import Image from "next/image";
import ImageThumbnail from "../../../img/ImageThumbnail.png";
import {
  type Like,
  type Ingredient,
  type Recipe,
  type User,
  type Save,
} from "@prisma/client";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import Link from "next/link";
import ActivityButtonsContainer from "./ActivityButtonsContainer";
import { CheckBox } from "../FormsElements/Checkbox";

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
  LikedBy: Like[];
  SavedBy: Save[];
}
export default async function CookMaininfo({
  recipe,
  author,
  ingredients,
  LikedBy,
  SavedBy,
}: props) {
  const session = await getServerSession(authOptions);

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
          {session?.user.id == author.id && (
            <div className="flex w-full items-start justify-start gap-4 ">
              <Link href={`/recipe/${recipe.id}/edit`}>
                <MdOutlineModeEditOutline size={20} />
              </Link>
              <Link href={`/recipe/${recipe.id}/delete`}>
                <MdOutlineDeleteOutline size={20} />
              </Link>
            </div>
          )}
          <div className="flex flex-col items-start justify-center gap-4 ">
            <div className="flex flex-col items-start justify-center gap-1">
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
              <Link
                href={`/user/${author.id}`}
                className="text-sm font-normal leading-[21px] text-black underline"
              >
                {author.name}
              </Link>
            </div>
            <ActivityButtonsContainer
              likedBy={LikedBy}
              savedBy={SavedBy}
              recipeId={recipe.id}
            />
          </div>
        </div>
        <div className="h-px w-full bg-black" />

        <div className="flex flex-col items-start justify-start gap-2">
          <p className="text-sm font-semibold text-black">Ingredients</p>
          <div className="flex flex-wrap items-start justify-center gap-2">
            {ingredients
              .sort(
                (a, b) => a.ingredient.name.length - b.ingredient.name.length,
              )
              .map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 rounded border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                >
                  <div className="flex items-center justify-center">
                    {ingredient.quantity} {ingredient.ingredient.name}{" "}
                    {ingredient.measurement}{" "}
                    {ingredient.optional && "(Optional)"}
                  </div>
                  <CheckBox />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
