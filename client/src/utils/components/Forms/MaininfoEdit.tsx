import Image from "next/image";
import ProfileThumbnail from "../../../img/ProfileThumbnail.png";
import ImageThumbnail from "../../../img/ImageThumbnail.png";
import InputField from "./TextField";
import { useSession } from "next-auth/react";
import { IngredientsInput } from "./IngredientsInput";
import { useState } from "react";
import { type Ingredient } from "@prisma/client";

export interface MainInfo {
  title: string;
  description: string;
  ingredients: Ingredient[];
}

type props = {
  onChange: (newMainInfo: MainInfo) => void;
};

export default function MaininfoEdit({ onChange }: props) {
  const defaultState = {
    title: "",
    description: "",
    ingredients: [],
  };
  const [mainInfo, setMainInfo] = useState<MainInfo>(defaultState);
  const { data } = useSession();

  return (
    <div className="flex w-full flex-row justify-between gap-20">
      <Image
        className="flex h-[500px] w-[656px]"
        height={500}
        width={656}
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
                  if (mainInfo != defaultState) onChange(mainInfo);
                }}
                value={mainInfo.title}
                size="Large"
                type="text"
              />
              <InputField
                value={mainInfo.description}
                onChange={(newValue) => {
                  setMainInfo((prev) => ({ ...prev, description: newValue }));
                  if (mainInfo != defaultState) onChange(mainInfo);
                }}
                size="Default"
                type="text"
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

          <div className="flex flex-wrap items-center justify-start gap-1">
            <IngredientsInput
              name="Ingredients"
              placeholder="Add Ingredient"
              onChange={(newSelectedIngredients) => {
                setMainInfo((prev) => ({
                  ...prev,
                  ingredients: newSelectedIngredients,
                }));
                if (mainInfo != defaultState) onChange(mainInfo);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
