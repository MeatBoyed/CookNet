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
import { Ingredient } from "@prisma/client";
import {
  CreateIngredient,
  CreateIngredientPayload,
} from "@/app/actions/IngredientActions";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import CreateIngredientSkeleton from "../Skeletons/CreateIngredientSkeleton";
import { Check, Loader2 } from "lucide-react";

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
  const { userId } = useAuth();
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [createdIngredient, setCreatedIngredient] = useState<
    Ingredient | undefined
  >(undefined);

  const ingredientForm = useForm<IngredientForm>({
    resolver: zodResolver(IngredientFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  if (!userId) return <RedirectToSignIn />;

  const onSubmit = async (input: IngredientForm) => {
    setLoading(true);
    setError(undefined);
    setCreatedIngredient(undefined);

    const payload: CreateIngredientPayload = {
      name: input.name,
      description: input.description ? input.description : "",
      createdBy: userId,
    };
    const res = await CreateIngredient(payload);

    if (res?.error) setError(res.error);
    if (res?.data) {
      setCreatedIngredient(res.data);
      setIngredients((prev) => [...prev, res?.data]);
    }
    setLoading(false);
  };

  return (
    <Sheet>
      <SheetTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
        Create an Ingredient
      </SheetTrigger>
      <SheetContent>
        <Form {...ingredientForm}>
          <form
            onSubmit={ingredientForm.handleSubmit(onSubmit)}
            className="flex justify-center items-center flex-col gap-5 w-full"
          >
            <SheetHeader className="w-full">
              <SheetTitle className="text-center">
                Create A New Ingredient
              </SheetTitle>
              <SheetDescription className="text-center">
                By adding ingredients you&#39;r improving the app
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col justify-center items-center gap-3 ">
              {loading ? (
                <Loader2 className="mr-2 h-10 w-10 animate-spin" />
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <Button disabled={loading} className="w-full" type="submit">
                Create Ingredient
              </Button>
              <SheetFooter>
                <SheetClose asChild>
                  <Button disabled={loading} variant={"outline"} type="submit">
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
            <p className="font-semibold text-destructive">{error && error}</p>
            {createdIngredient && (
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="flex justify-center items-center gap-3">
                  <Check size={25} className="text-green-500" />
                  <p className="text-sm font-semibold">
                    {createdIngredient.name} has been created.
                  </p>
                </div>
                <p className="text-sm">Thank you for you contribution</p>
              </div>
            )}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
