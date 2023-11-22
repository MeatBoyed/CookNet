"use client";
import Image from "next/image";
import ProfileThumbnail from "../../../img/ProfileThumbnail.png";
import ImageThumbnail from "../../../img/ImageThumbnail.png";
import InputField from "./TextField";
import { getSession, useSession } from "next-auth/react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type IngredientOnRecipe, type Ingredient } from "@prisma/client";
import IngredientsInput from "./IngredientsInput";
import { type RecipeFormData } from "../Forms/CreateRecipeForm";

type props = {
  mainInfo: MainInfo;
  setMainInfo: Dispatch<SetStateAction<MainInfo>>;
  ingredients: Ingredient[];
};
export interface MainInfo {
  title: string;
  description: string;
  ingredients: IngredientOnRecipe[];
  authorId: string;
}

export default function MaininfoEdit({
  mainInfo,
  setMainInfo,
  ingredients,
}: props) {
  const { data } = useSession();
  // const [mainInfo, setMainInfo] = useState<MainInfo>(defaultState);

  return (
    <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-10">
      <Image
        className="flex h-[300px] w-[400px]"
        height={300}
        width={400}
        src={ImageThumbnail}
        alt="Recipe Thumbnail"
      />
      <div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col items-start justify-start gap-12">
            <div className="flex w-full flex-col items-start justify-center gap-5">
              <div className="w-full text-sm font-semibold leading-[21px] text-black">
                Recipe
              </div>
              <InputField
                onChange={(newValue) => {
                  setMainInfo((prev) => ({ ...prev, title: newValue }));
                }}
                value={mainInfo.title}
                size="Large"
                type="text"
                name="Title"
                placeholder="Carrot Cake"
              />
              <InputField
                value={mainInfo.description}
                onChange={(newValue) => {
                  setMainInfo((prev) => ({ ...prev, description: newValue }));
                }}
                size="Default"
                type="text"
                placeholder="Charles would love a slice"
                name="Short Description (optional)"
              />
            </div>

            <div className="flex flex-row items-start justify-start gap-5">
              <Image
                height={48}
                width={48}
                src={ProfileThumbnail}
                alt="Recipe Thumbnail"
              />
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold leading-[21px] text-black">
                  {data?.user.name}
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="text-sm font-normal leading-[21px] text-black">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-black" />

          <div className="flex flex-wrap items-center justify-start gap-2">
            <div className="w-full text-sm font-semibold leading-[21px] text-black">
              Ingredients
            </div>
            <IngredientsInput
              ingredients={ingredients}
              selectedIngredients={mainInfo.ingredients}
              setMainInfo={setMainInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
