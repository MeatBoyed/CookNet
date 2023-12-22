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
import { object, z } from "zod";
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
import { Ingredient, PrismaClient } from "@prisma/client";
import {
  CreateIngredient,
  CreateIngredientPayload,
} from "@/app/actions/IngredientActions";

interface props {
  setIngredients: Dispatch<SetStateAction<Ingredient[]>>;
}

const IngredientFormSchema = object({
  name: z.string().min(3, {
    message: "Please enter a proper Name.",
  }),
  description: z.string().optional(),
});

type IngredientForm = z.infer<typeof IngredientFormSchema>;
/**
 * Creates a new Ingredient in the Database
 * Updates RecipeForm with added Ingredient
 * @param param0
 * @returns
 */
export default function CreateIngredientDialog({ setIngredients }: props) {
  const [error, setError] = useState<string | undefined>("");
  const [createdIngredient, setCreatedIngredient] = useState<
    Ingredient | undefined
  >();
  const ingredientForm = useForm<IngredientForm>({
    resolver: zodResolver(IngredientFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (input: IngredientForm) => {
    setError(undefined);

    const payload: CreateIngredientPayload = {
      name: input.name,
      description: input.description ? input.description : "",
      createdBy: "Random User",
    };
    const res = await CreateIngredient(payload);

    if (res?.error) return setError(res.error);
    if (res?.data) {
      setCreatedIngredient(res.data);
      setIngredients((prev) => [...prev, res?.data]);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button size={"sm"}>Create an Ingredients</Button>
      </SheetTrigger>
      <SheetContent>
        <Form {...ingredientForm}>
          <form
            onSubmit={ingredientForm.handleSubmit(onSubmit)}
            className="flex justify-center items-center flex-col gap-5 w-full"
          >
            <SheetHeader className="w-full">
              <SheetTitle>Create A New Ingredient</SheetTitle>
              <SheetDescription>
                This Ingredient can be used by others.
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col justify-center items-center gap-3 ">
              <FormField
                control={ingredientForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="Large Eggs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={ingredientForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <Button className="w-full" type="submit">
                Create Ingredient
              </Button>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant={"outline"} type="submit">
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
            <p className="font-semibold text-destructive">{error && error}</p>
            {createdIngredient && (
              <div className="flex flex-col justify-center items-start gap-2">
                <p className="font-semibold text-green-500">
                  Your Ingredient {createdIngredient.name} has been created.
                </p>
                <p className="font-semibold text-sm">
                  Thank you for you contribution
                </p>
              </div>
            )}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
