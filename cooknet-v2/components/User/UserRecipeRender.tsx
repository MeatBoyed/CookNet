"use client";

import { Recipe } from "@prisma/client";
import RecipeCard from "../RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RecipeRender } from "@/app/actions/lib/UserHandles";
import { Button } from "../ui/button";
import Link from "next/link";

interface props {
  username: string;
  recipes: RecipeRender[];
  cookBook: RecipeRender[];
  isAuth: boolean;
}

export default function UserRecipeRender({
  username,
  recipes,
  cookBook,
  isAuth,
}: props) {
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
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              name={recipe.name}
              recipeId={recipe.id}
              createdAt={recipe.createdDate}
              description={recipe.description}
              username={recipe.author.username}
              ingredientsObj={recipe.ingredients}
              likes={30}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center gap-3">
            {isAuth && (
              <>
                <p className="text-xl font-semibold tracking-widest">
                  Create your first Recipe
                </p>
                <Button>
                  <Link
                    href={`/${username}/r/create`}
                    className="text-sm font-normal leading-normal text-white"
                  >
                    Create Recipe
                  </Link>
                </Button>
              </>
            )}
          </div>
        )}
      </TabsContent>
      <TabsContent
        value="CookBook"
        className="grid w-full grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-3 md:grid-cols-2"
      >
        {cookBook.length > 0 ? (
          cookBook.map((recipe, index) => (
            <RecipeCard
              key={index}
              name={recipe.name}
              recipeId={recipe.id}
              createdAt={recipe.createdDate}
              description={recipe.description}
              username={recipe.author.username}
              ingredientsObj={recipe.ingredients}
              likes={30}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center gap-3">
            {isAuth && (
              <>
                <p className="text-xl font-semibold tracking-widest">
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
              </>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
