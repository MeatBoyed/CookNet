"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { measurements } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Dispatch, SetStateAction, useState } from "react";
import { TypeIngredient, IngredientSchema } from "../ui/Ingredient";
import Ingredients from "../Recipe/Ingredients";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface props {
  ingredients: TypeIngredient[];
  setIngredients: Dispatch<SetStateAction<TypeIngredient[]>>;
}

export default function IngredientsInputDialog({
  ingredients,
  setIngredients,
}: props) {
  const ingredientForm = useForm<z.infer<typeof IngredientSchema>>({
    resolver: zodResolver(IngredientSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      measurement: "Empty",
      optional: "",
    },
  });

  const onSubmit = (ingredientInput: z.infer<typeof IngredientSchema>) => {
    setIngredients((prev) => [...prev, ingredientInput]);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button>Add Ingredients</Button>
      </SheetTrigger>
      <SheetContent>
        <Form {...ingredientForm}>
          <form
            onSubmit={ingredientForm.handleSubmit(onSubmit)}
            className="flex justify-center items-center flex-col gap-5 w-full"
          >
            <SheetHeader className="w-full">
              <SheetTitle>Add Your Ingredients</SheetTitle>
              <SheetDescription>Add your ingredients....</SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col justify-center items-center gap-3 ">
              <FormField
                control={ingredientForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Large Eggs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ingredientForm.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center items-center gap-3">
                <FormField
                  control={ingredientForm.control}
                  name="measurement"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-10 rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        >
                          <option
                            value=""
                            className="font-semibold tracking-widest "
                          >
                            Measurements
                          </option>
                          {measurements.map((option, index) => (
                            <option
                              className="text-sm"
                              key={index}
                              value={option}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={ingredientForm.control}
                  name="optional"
                  render={({ field }) => (
                    <FormItem className="flex justify-center items-end gap-2">
                      <FormControl>
                        <Checkbox
                          {...field}
                          value={field.value}
                          onCheckedChange={(event: CheckedState) =>
                            field.onChange(event ? "true" : undefined)
                          }
                        />
                      </FormControl>
                      <FormLabel>Optional</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <Button className="w-full" type="submit">
                Add Ingredient
              </Button>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant={"outline"} type="submit">
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
            {/* Use an Ingredients Render-er for this */}
            <Ingredients ingredients={ingredients} />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
