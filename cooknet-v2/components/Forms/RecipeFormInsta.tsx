"use client";

import React from "react";
import { Input } from "../ui/input";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { MultiImageDropzone } from "../ui/MultiImageDropZone";
import useMultiFileUpload from "@/lib/useMultiFileUpload";
import { Label } from "../ui/label";
import useRecipe, { RecipeForm, RecipeFormSchema } from "@/lib/useRecipe";
import { CreateRecipeLoadingText } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { QueriedRecipe } from "@/app/actions/lib/RecipeHandles";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function RecipeFormInsta({
  recipe,
  user,
}: {
  recipe?: QueriedRecipe;
  user: { id: string; username: string };
}) {
  const {
    fileStates,
    deletedUrls,
    getURLs,
    handleFileChange,
    handleFileDelete,
    handleFilesAdded,
  } = useMultiFileUpload(recipe?.images);

  const { isLoading, error, CreateRecipe, UpdateRecipe, DeleteRecipe } =
    useRecipe(user);

  const recipeForm = useForm<RecipeForm>({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: {
      name: recipe?.name || "",
      description: recipe?.description || "",
      hours: recipe?.hours || 0,
      minutes: recipe?.minutes || 0,
    },
  });

  async function OnSubmit(input: RecipeForm) {
    if (typeof recipe != "undefined") {
      return await UpdateRecipe(recipe.id, input, getURLs(), deletedUrls);
    }
    {
      return await CreateRecipe(input, getURLs());
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex-col flex justify-center items-center gap-3">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
        <p className="text-md">
          {
            CreateRecipeLoadingText[
              Math.floor(Math.random() * CreateRecipeLoadingText.length)
            ]
          }
        </p>
      </div>
    );

  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-between gap-10">
      <div className="w-full flex flex-col items-start justify-between gap-10 lg:flex-row">
        <div className="w-full flex flex-col justify-center items-start gap-3">
          <MultiImageDropzone
            className="w-full"
            value={fileStates}
            dropzoneOptions={{
              maxFiles: 4,
            }}
            onChange={(files) => handleFileChange(files)}
            onFileDelete={(file) => handleFileDelete(file)}
            onFilesAdded={async (addedFiles) =>
              await handleFilesAdded(addedFiles)
            }
          />
          <Label className="tracking-widest leading-normal">
            Please upload 1/2 images of the Recipe & Optionally the final dish.
            Pantry storage isn&#39;t free.
          </Label>
        </div>
        <Form {...recipeForm}>
          <form
            onSubmit={recipeForm.handleSubmit(OnSubmit)}
            className="w-full flex justify-center items-start flex-col gap-5"
          >
            <p className="text-destructive text-base">{error && error}</p>

            <FormField
              control={recipeForm.control}
              name="name"
              defaultValue={recipe?.name}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Burger"
                      className="text-2xl font-extrabold tracking-widest "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={recipeForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="tracking-widest "
                      placeholder="Describe your Alien Cheese Burger"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col justify-center items-start gap-3">
              <Label>Duration</Label>
              <div className="flex justify-center items-center gap-4">
                <FormField
                  control={recipeForm.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="1 hr"
                          className="text-base tracking-widest "
                        />
                      </FormControl>
                      <FormLabel>Hours</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={recipeForm.control}
                  name="minutes"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="30 min"
                          className="text-base tracking-widest "
                        />
                      </FormControl>
                      <FormLabel>Minutes</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center gap-3 xs:flex-wrap">
              <Button type="submit" className="w-full">
                {recipe ? "Save Changes" : "Create"}
              </Button>
              {recipe && (
                <>
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="w-full"
                  >
                    <Link href={`/${recipe.author.username}/r/create`}>
                      Create
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 rounded-md">
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this recipe!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () =>
                            await DeleteRecipe(recipe.id, recipe.images)
                          }
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
