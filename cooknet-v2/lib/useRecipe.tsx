"use client";

import {
  CreateRecipeAction,
  DeleteRecipeAction,
  UpdateRecipeAction,
} from "@/app/actions/RecipeActions";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { object, z } from "zod";
import { useEdgeStore } from "./edgstore";
import useGetValUser from "./useGetValUser";

export const RecipeFormSchema = object({
  name: z.string().min(1, { message: "Please enter a Name for your Recipe" }),
  description: z.string().min(1, { message: "Please describe your Recipe" }),
  hours: z.coerce.number(),
  minutes: z.coerce
    .number()
    .min(0.1, { message: "Please enter a duration" })
    .max(60, {
      message: "Your maths isn't cutting it. Only 60 minutes are possible.",
    }),
});

export type RecipeForm = z.infer<typeof RecipeFormSchema>;

export default function useRecipe(user: { username: string; id: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const { edgestore } = useEdgeStore();

  async function CreateRecipe(input: RecipeForm, imageURLs: string[]) {
    // Manage states
    setIsLoading(true);
    setError(undefined);

    // Add Recipe to DB
    const res = await CreateRecipeAction({
      ...input,
      authorId: user.id,
      images: imageURLs,
    });

    if (res.error || res.data === undefined) {
      setError(res.error);
      setIsLoading(false);
      return;
    }

    try {
      // Confirm Image URLS
      imageURLs.map(async (image) => {
        await edgestore.publicFiles.confirmUpload({ url: image });
      });
      router.push(`/${user.username}/r/${res.data}`);
      return setIsLoading(false);
    } catch (e) {
      setError(
        "An unexpected error occurred when saving image. Please try again."
      );
      setIsLoading(false);
    }
  }

  async function UpdateRecipe(
    recipeId: string,
    input: RecipeForm,
    imageURLs: string[],
    deletedUrls: string[]
  ) {
    // Manage states
    setIsLoading(true);
    setError(undefined);

    console.log("Images: ", imageURLs);

    // Add Recipe to DB
    try {
      const res = await UpdateRecipeAction({
        ...input,
        id: recipeId,
        authorId: user.id,
        images: imageURLs,
      });

      if (res.error || res.data === undefined) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      // // Delete Removed Images
      if (deletedUrls) {
        deletedUrls.map(async (image) => {
          await edgestore.publicFiles.delete({ url: image });
        });
      }

      // Confirm new links
      if (imageURLs) {
        // Confirm Image URLS
        imageURLs.map(async (image) => {
          await edgestore.publicFiles.confirmUpload({ url: image });
        });
      }

      router.push(`/${user.username}/r/${res.data}`);
    } catch (e) {
      console.log(e);
      setError(
        "An unexpected error occurred when saving image. Please try again." +
          `${e}`
      );
      return setIsLoading(false);
    }
  }

  async function DeleteRecipe(recipeId: string, imageURLs: string[]) {
    // Manage states
    setIsLoading(true);
    setError(undefined);

    // Add Recipe to DB
    try {
      const res = await DeleteRecipeAction(recipeId);

      if (res.error || res.data === undefined) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      // Delete Image URLs
      imageURLs.map(async (image) => {
        try {
          await edgestore.publicFiles.delete({ url: image });
        } catch (e) {
          console.log("Error: ", e);
        }
      });

      router.push(`/${user.username}/`);
    } catch (e) {
      setError(
        "An unexpected error occurred when saving image. Please try again."
      );
      return setIsLoading(false);
    }
  }

  return { isLoading, error, CreateRecipe, UpdateRecipe, DeleteRecipe };
}
