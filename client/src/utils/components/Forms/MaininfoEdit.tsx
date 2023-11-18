import Image from "next/image";
import ProfileThumbnail from "../../../img/ProfileThumbnail.png";
import ImageThumbnail from "../../../img/ImageThumbnail.png";
import InputField from "./TextField";
import { useSession } from "next-auth/react";
import { IngredientsInput } from "./IngredientsInput";
import { useState } from "react";
import { Ingredient } from "@prisma/client";

interface MainInfo {
  title: string;
  description: string;
  ingredients: Ingredient[];
}

export default function MaininfoEdit() {
  const [mainInfo, setMainInfo] = useState<MainInfo>({
    title: "",
    description: "",
    ingredients: [],
  });
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
                onChange={(newValue) =>
                  setMainInfo((prev) => ({ ...prev, title: newValue }))
                }
                value={mainInfo.title}
                size="Large"
                type="text"
              />
              <InputField
                value={mainInfo.description}
                onChange={(newValue) =>
                  setMainInfo((prev) => ({ ...prev, description: newValue }))
                }
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
              onChange={(newSelectedIngredients) =>
                setMainInfo((prev) => ({
                  ...prev,
                  ingredients: newSelectedIngredients,
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
