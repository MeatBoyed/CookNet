"use client";

import { Heart, HeartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ToolTip } from "../ToolTip";
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
import { AddToCookBook, RemoveFromCookBook } from "@/app/actions/UserActions";
import { useEffect, useState } from "react";
import { RedirectToSignIn } from "@clerk/nextjs";

interface props {
  variant?: "Recipe" | "Create" | "Cook";
}

export default function ActionButtons({ variant }: props) {
  switch (variant) {
    case "Recipe":
      return RecipeActionButtons;
    case "Create":
      return EditActionButtons;
    case "Cook":
      return CookActionButtons;
  }
}

export function RecipeActionButtons({
  userId,
  username,
  recipeId,
  isAuthor,
  cookBook,
}: {
  userId: string;
  username: string;
  recipeId: string;
  isAuthor?: boolean;
  cookBook: string[];
}) {
  const [error, setError] = useState<string | undefined>();
  const [inCookBook, setInCookBook] = useState<boolean>(false);

  useEffect(() => {
    const res = cookBook?.find((recId) => recId === recipeId);
    if (res) return setInCookBook(true);
  }, []);

  const handleAdd = async () => {
    setError(undefined);

    // Add to CookBook
    cookBook.push(recipeId);
    const res = await AddToCookBook(userId, cookBook);

    if (res.error) return setError(res.error);
    if (res.data) return setInCookBook(true);
  };

  const handleRemove = async () => {
    setError(undefined);

    const newCookBook = cookBook.filter((rec) => rec != recipeId);
    const res = await RemoveFromCookBook(userId, newCookBook);

    if (res.error) return setError(res.error);
    if (res.data) return setInCookBook(false);
  };

  return (
    <div className="flex flex-col justify-center items-start gap-3">
      <div className="flex justify-center items-center gap-3">
        <Button className="flex justify-between items-center gap-3">
          <Link href={`/${username}/r/${recipeId}/cook`}>CookNet</Link>
          <ToolTip message="Design " />
        </Button>
        {isAuthor && (
          <Button variant={"outline"}>
            <Link href={`/${username}/r/${recipeId}/edit`}>Edit</Link>
          </Button>
        )}
        <div
          onClick={inCookBook ? handleRemove : handleAdd}
          className="hover:cursor-pointer"
        >
          {inCookBook ? (
            <Heart
              fill="rgb(239 68 68 / var(--tw-text-opacity)"
              size={25}
              className="text-red-500"
            />
          ) : (
            <Heart size={25} />
          )}
        </div>
      </div>
      {error === "Please complete your account details." ? (
        <div className="flex justify-center items-center gap-3">
          <p className="font-semibold text-destructive">{error}</p>
          <Link href="/onboarding" className="underline">
            Complete Account
          </Link>
        </div>
      ) : (
        <p className="font-semibold text-destructive">{error}</p>
      )}
    </div>
  );
}

export function EditActionButtons({
  username,
  handleUpdate,
  handleDelete,
}: {
  username: string;
  handleUpdate: () => void;
  handleDelete: () => void;
}) {
  return (
    <div className="w-full flex justify-between items-center gap-3">
      <div className="flex justify-center items-center gap-3">
        <Button onClick={handleUpdate}>Update</Button>
        <Button variant={"secondary"}>
          <Link href={`/${username}/r/create`}>Create</Link>
        </Button>
      </div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 rounded-md">
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              recipe!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function CookActionButtons({
  username,
  recipeId,
}: {
  username: string;
  recipeId: string;
}) {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button className="flex justify-between items-center gap-3">
        <Link href={`/${username}/r/${recipeId}`}>Finish</Link>
        <ToolTip message="Design " />
      </Button>
      <Button variant={"outline"}>Add to CookBook</Button>
    </div>
  );
}
