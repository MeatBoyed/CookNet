import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import CheeseBurger from "../public/Alien Cheesburger.png";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Dot, Heart, HeartIcon } from "lucide-react";

interface props {
  username: string;
  createdAt: Date;
  likes: number;
  name: string;
  description: string;
  ingredients?: string[];
  ingredientsObj?: { ingredient: { name: string } }[];

  recipeId: string;
}

export default function RecipeCard({
  recipeId,
  username,
  createdAt,
  likes,
  name,
  description,
  ingredients,
  ingredientsObj,
}: props) {
  return (
    <Card className="w-80">
      <Image
        src={CheeseBurger}
        width={320}
        height={300}
        alt="Thumbnail"
        className=""
      />
      <CardHeader className="p-3">
        <div className="flex justify-start items-center">
          <Link href={`/${username}`} className="text-xs capitalize">
            {username}
          </Link>
          <Dot />
          <p className="text-xs">{createdAt.toLocaleDateString()}</p>
          {/* <Dot /> */}
          {/* <div className="flex justify-center items-center gap-1">
            <Heart size={15} className="text-red-500" />
            <p className="text-xs">{likes}</p>
          </div> */}
        </div>
        <Link href={`/${username}/r/${recipeId}`}>
          <CardTitle>{name}</CardTitle>
        </Link>
        {description != "" && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex justify-start items-start gap-2 p-3 flex-wrap">
        {ingredientsObj &&
          ingredientsObj.map((ingredient, index) => (
            <Badge key={index} variant={"secondary"}>
              {ingredient.ingredient.name}
            </Badge>
          ))}
        {ingredients &&
          ingredients.map((ingredient, index) => (
            <Badge key={index} variant={"secondary"}>
              {ingredient}
            </Badge>
          ))}
      </CardContent>
    </Card>
  );
}
