import Image from "next/image";
import ImageThumbnail from "../../img/ImageThumbnail.png";
import { Recipe } from "@prisma/client";
import Link from "next/link";

interface RecipeProp {
  title: string;
  id: string;
  description: string;
  author: {
    name: string | null;
  };
}

export default function RecipeCard({ recipe }: { recipe: RecipeProp }) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-3">
      <Link href={`/recipe/${recipe.id}`} className="w-full">
        <Image
          height={300}
          width={400}
          src={ImageThumbnail}
          alt="Recipe Thumbnail"
          className="w-full"
        />
      </Link>
      <div className="flex flex-col items-start justify-start gap-1">
        <p className="space-x-2 font-['Roboto'] text-xs font-semibold text-black">
          Meal
        </p>
        <Link
          href={`/recipe/${recipe.id}`}
          className="font-['Roboto'] text-xl font-bold text-black"
        >
          {recipe.title}
        </Link>
        <p className="font-['Roboto'] text-sm font-normal text-black">
          {recipe.description}
        </p>
      </div>
      <div className="flex w-full items-center justify-start gap-2">
        <p className="font-['Roboto'] text-sm font-semibold leading-[21px] text-black">
          {recipe.author.name}
        </p>
        {/* <div className="font-['Roboto'] text-lg font-normal text-black">•</div> */}
        {/* <div className="font-['Roboto'] text-sm font-normal leading-[21px] text-black">
          11 Jan 2022
        </div> */}
      </div>
    </div>
  );
}
