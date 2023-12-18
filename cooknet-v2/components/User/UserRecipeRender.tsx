"use client";

import RecipeCard from "../RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function UserRecipeRender() {
  return (
    <Tabs
      defaultValue="Recipes"
      className="w-full flex justify-center items-center flex-col gap-8"
    >
      <TabsList>
        <TabsTrigger value="Recipes">Recipes</TabsTrigger>
        <TabsTrigger value="CookBook">Cook Book</TabsTrigger>
      </TabsList>
      <TabsContent
        value="Recipes"
        className="grid w-full grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-3 md:grid-cols-2"
      >
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </TabsContent>
      <TabsContent value="CookBook">Change your password here.</TabsContent>
    </Tabs>
  );
}
