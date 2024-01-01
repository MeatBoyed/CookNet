"use client";

import { Recipe } from "@prisma/client";
import RecipeCard from "../RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  GetRecipeCookBook,
  GetUsersRecipes,
  RecipeRender,
} from "@/app/actions/lib/UserHandles";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QueriedRecipe } from "@/app/actions/lib/RecipeHandles";

interface props {
  username: string;
  isAuth: boolean;
  userId: string;
  recipes: QueriedRecipe[];
}

export default function UserRecipeRender({
  username,
  isAuth,
  userId,
  recipes,
}: props) {
  const [cookBook, setCookBook] = useState<QueriedRecipe[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const cookBook = await GetRecipeCookBook(userId);
      setCookBook(cookBook);
    };

    if (isAuth) fetch();
  }, [isAuth, userId]);

  return (
    <Tabs
      defaultValue="Recipes"
      className="w-full flex justify-center items-center flex-col gap-8"
    >
      <TabsList>
        <TabsTrigger value="Recipes">Recipes</TabsTrigger>
        {isAuth && <TabsTrigger value="CookBook">Cook Book</TabsTrigger>}
      </TabsList>
      <TabsContent
        value="Recipes"
        className="grid w-full grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-3 md:grid-cols-2"
      >
        {isAuth && (
          <div className="flex flex-col justify-center items-center gap-5">
            {!recipes.length && (
              <p className="text-xl font-semibold tracking-widest">
                Create your first Recipe
              </p>
            )}
            <Button size={"sm"}>
              <Link
                href={`/${username}/r/create`}
                className="text-sm font-normal leading-normal text-white"
              >
                Create Recipe
              </Link>
            </Button>
          </div>
        )}
        {recipes.length > 0 && <RenderRecipe recipes={recipes} />}
      </TabsContent>
      <TabsContent
        value="CookBook"
        className="grid w-full grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-3 md:grid-cols-2"
      >
        {cookBook.length > 0 && <RenderRecipe recipes={cookBook} />}
        {!cookBook.length && isAuth && (
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-xl font-semibold tracking-widest text-center">
              Start adding Recipes to your Cook Book
            </p>
            <Button>
              <Link
                href={`/`}
                className="text-sm font-normal leading-normal text-white"
              >
                View Recipes
              </Link>
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

function RenderRecipe({ recipes }: { recipes: QueriedRecipe[] }) {
  return (
    <>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
          username={recipe.author.username}
          // likes={30}
        />
      ))}
    </>
  );
}
