"use client";
import { type Ingredient } from "@prisma/client";
import MaininfoEdit, { type MainInfo } from "../FormsElements/MaininfoEdit";
import StepsInput from "../FormsElements/StepsInput";
import { useState } from "react";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { CreateRecipeEndPoint } from "~/app/recipe/create/EndPoints";

interface props {
  ingredients: Ingredient[];
}

export interface RecipeFormData {
  mainInfo: MainInfo;
  steps: string[];
}

export default function CreateRecipeForm({ ingredients }: props) {
  const [formData, setFormData] = useState<RecipeFormData>({
    mainInfo: { description: "", ingredients: [], title: "", authorId: "" },
    steps: [],
  });
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    const res = await CreateRecipeEndPoint(formData);

    if (res == "No Steps") return setMessage(res);
    if (res == "Not Added") return setMessage(res);

    console.log(res);
    redirect(`/recipe/${res}`);
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      {message}
      <div className="flex w-full items-start justify-between gap-4 ">
        <button className="flex items-center justify-center gap-2 border border-black px-5 py-2">
          <div className="text-base font-normal leading-normal text-black">
            Go Back
          </div>
        </button>
        <button
          onClick={() => handleSubmit()}
          className="flex items-center justify-center gap-2 border border-black bg-black px-5 py-2"
        >
          <div className="text-base font-normal leading-normal text-white">
            Create
          </div>
        </button>
      </div>
      <MaininfoEdit
        onChange={(newMainInfo) =>
          setFormData((prev) => ({ ...prev, mainInfo: newMainInfo }))
        }
        ingredients={ingredients}
      />
      <StepsInput
        onChange={(newSteps) =>
          setFormData((prev) => ({ ...prev, steps: newSteps }))
        }
      />
    </div>
  );
}
