import { Heart } from "lucide-react";
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
  username,
  recipeId,
}: {
  username: string;
  recipeId: string;
}) {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button className="flex justify-between items-center gap-3">
        <Link href={`/${username}/r/${recipeId}/cook`}>CookNet</Link>
        <ToolTip message="Design " />
      </Button>
      <Button variant={"outline"}>Add to CookBook</Button>
      <div className="flex justify-center items-center gap-1">
        <Heart size={25} className="text-red-500" />
        <p className="text-lg text-center">3</p>
      </div>
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
      <div className="flex justify-center items-center gap-1">
        <Heart size={25} className="text-red-500" />
        <p className="text-lg text-center">3</p>
      </div>
    </div>
  );
}
