import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import Link from "next/link";
import { Clock2Icon, Dot } from "lucide-react";
import { Recipe } from "@prisma/client";

export default function RecipeCard({
  recipe,
  username,
}: {
  recipe: Recipe;
  username: string;
}) {
  return (
    <Card className="">
      {/* <Image
        src={CheeseBurger}
        width={320}
        height={300}
        alt="Thumbnail"
        className=""
      /> */}
      <CardHeader className="p-3">
        <Link href={`/${username}/r/${recipe.id}`}>
          <CardTitle>{recipe.name}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex justify-center items-start flex-col gap-3 p-3">
        <div className="flex justify-start items-center">
          <Link href={`/${username}`} className="text-xs capitalize">
            {username}
          </Link>
          <Dot />
          <p className="text-xs">{recipe.createdDate.toLocaleDateString()}</p>
          {/* <Dot /> */}
          {/* <div className="flex justify-center items-center gap-1">
            <Heart size={15} className="text-red-500" />
            <p className="text-xs">{likes}</p>
          </div> */}
        </div>
        {recipe.description != "" && (
          <p className="text-muted-foreground">{recipe.description}</p>
        )}
        <div className="flex justify-center items-center gap-3">
          <Clock2Icon size={16} />
          <p>
            {recipe.hours > 0 && `${recipe.hours} hrs`} {recipe.minutes} min
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
