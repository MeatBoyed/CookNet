import { Recipe } from "@prisma/client";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { RecipeFormData } from "~/utils/components/Forms/CreateRecipeForm";

export async function POST(request: Request) {
  const { formValues } = request.body; // Assuming you're sending the data as JSON
  console.log(formValues);

  if (!isRecipeFormData(formValues)) {
    NextResponse.status(200).json({ message: "Data is not in right format" });
  }
  const res = await db.recipe.create({
    data: {
      authorId: formValues.mainInfo.authorId,
      title: formValues.mainInfo.title,
      description: formValues.mainInfo.description,
      steps: formValues.steps,
      ingredients: {
        create: formValues.mainInfo.ingredients,
      },
    },
  });

  if (res.id === undefined) {
  }

  // Return a response
  NextResponse.status(200).json({ message: "User added successfully" });
}

const isRecipeFormData = (object: unknown): object is RecipeFormData => {
  if (object !== null && typeof object === "object") {
    return "mainInfo" in object;
  }

  return false;
};
