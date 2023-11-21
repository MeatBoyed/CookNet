"use server";
import { connect } from "http2";
import { db } from "~/server/db";
import { type RecipeFormData } from "~/utils/components/Forms/CreateRecipeForm";

export const CreateRecipeEndPoint = async (formData: RecipeFormData) => {
  if (formData.steps.length === 0) return "No Steps";

  const res = await db.recipe.create({
    data: {
      title: formData.mainInfo.title,
      description: formData.mainInfo.description,
      steps: formData.steps,
      author: {
        connect: { id: formData.mainInfo.authorId },
      },
      ingredients: {
        create: formData.mainInfo.ingredients.map((ingredient) => ({
          quantity: ingredient.quantity,
          measurement: ingredient.measurement,
          optional: ingredient.optional,
          ingredient: {
            connect: { id: ingredient.ingredientId },
          },
        })),
      },
    },
  });

  if (res.id === undefined) return "Not Added";
  return res.id;
};
