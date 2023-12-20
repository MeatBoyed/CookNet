import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { ToolTip } from "../ToolTip";
import Link from "next/link";

interface props {
  variant?: "Recipe" | "Create" | "Cook";
}

export default function ActionButtons({ variant }: props) {
  switch (variant) {
    case "Recipe":
      return Recipe;
    case "Create":
      return Create;
    case "Cook":
      return Cook;
    default:
      return Recipe;
  }
}

const Recipe: JSX.Element = (
  <div className="flex justify-center items-center gap-3">
    <Button className="flex justify-between items-center gap-3">
      <Link href={"/charles/r/cheese/cook"}>CookNet</Link>
      <ToolTip message="Design " />
    </Button>
    <Button variant={"outline"}>Add to CookBook</Button>
    <div className="flex justify-center items-center gap-1">
      <Heart size={25} className="text-red-500" />
      <p className="text-lg text-center">3</p>
    </div>
  </div>
);

const Create: JSX.Element = (
  <div className="w-full flex justify-between items-center gap-3">
    <div className="flex justify-center items-center gap-3">
      <Button className="">Create</Button>
      <Button variant={"outline"}>Edit</Button>
    </div>
    <Button variant="destructive">Delete</Button>
  </div>
);

const Cook: JSX.Element = (
  <div className="flex justify-center items-center gap-3">
    <Button className="flex justify-between items-center gap-3">
      <Link href={"/charles/r/cheese"}>Finish</Link>
      <ToolTip message="Design " />
    </Button>
    <Button variant={"outline"}>Add to CookBook</Button>
    <div className="flex justify-center items-center gap-1">
      <Heart size={25} className="text-red-500" />
      <p className="text-lg text-center">3</p>
    </div>
  </div>
);
