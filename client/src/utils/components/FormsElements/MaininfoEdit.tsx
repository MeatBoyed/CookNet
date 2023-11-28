"use client";
import Image from "next/image";
import ProfileThumbnail from "../../../img/ProfileThumbnail.png";
import ImageThumbnail from "../../../img/ImageThumbnail.png";
import InputField from "./TextField";
import { useSession } from "next-auth/react";
import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { type IngredientOnRecipe, type Ingredient } from "@prisma/client";
import IngredientsInput from "./IngredientsInput";
import { VscWand } from "react-icons/vsc";

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
  const [title, setTitle] = useState<string>(mainInfo.title);
  const [description, setDescription] = useState<string>(mainInfo.description);
  const { data } = useSession();

  useEffect(() => {
    setMainInfo((prev) => ({
      ...prev,
      title: title,
      description: description,
    }));
  }, [title, description]);

  // [

  //   "https://replicate.delivery/pbxt/J1iGezYfahnWwEVryI6dHhi6E57KpZ4jeJKzXd1UWGocxq5jA/out-0.png"

  // ]

  return (
    <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-10">
      <div className="relative">
        <Image
          className="h-full w-full"
          height={300}
          width={400}
          src={ImageThumbnail}
          alt="Recipe Thumbnail"
        />
        <button className="absolute bottom-0 right-0 mb-2 mr-3 flex cursor-pointer items-center justify-center  gap-2 rounded-full bg-black px-3 py-2 text-white">
          <p className="text-xl font-semibold leading-[21px]">AI</p>
          <VscWand size={25} />
        </button>
        {/* <button className="absolute left-0 top-0 h-full w-full cursor-pointer bg-transparent opacity-0 hover:bg-black hover:text-white hover:opacity-75">
          Hover to see button
        </button> */}
      </div>
      <div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col items-start justify-start gap-12">
            <div className="flex w-full flex-col items-start justify-center gap-5">
              <p className="w-full text-sm font-semibold leading-[21px] text-black">
                Recipe
              </p>
              <InputField
                text={title}
                setText={setTitle}
                size="Large"
                type="text"
                name="Title"
                placeholder="Carrot Cake"
              />
              <InputField
                text={description}
                setText={setDescription}
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
