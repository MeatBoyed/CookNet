import { Ingredient, Recipe } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Measurments
export const measurementSchema = z.enum([
  "Empty",
  "Of Item",
  "Teaspoon",
  "Tablespoon",
  "Fluid Ounce",
  "Cup",
  "Pint",
  "Quart",
  "Gallon",
  "Milliliter",
  "Liter",
  "Ounce",
  "Pound",
  "Gram",
  "Kilogram",
  "Dash",
  "Pinch",
  "Smidgen",
  "Drop",
]);

export type Measurements = z.infer<typeof measurementSchema>;
export const measurements = [
  "Of Item",
  "Teaspoon",
  "Tablespoon",
  "Fluid Ounce",
  "Cup",
  "Pint",
  "Quart",
  "Gallon",
  "Milliliter",
  "Liter",
  "Ounce",
  "Pound",
  "Gram",
  "Kilogram",
  "Dash",
  "Pinch",
  "Smidgen",
  "Drop",
];

const Conversions = {
  tablespoonToTeaspoon: 3,
  cupToTablespoon: 16,
  fluidOunceToTablespoon: 2,
  pintToCup: 2,
  quartToCup: 4,
  gallonToCup: 16,
  ounceToGram: 28.35,
  poundToOunce: 16,
  kilogramToPound: 2.20462,
};

export const defaultIngredient: Ingredient = {
  id: "",
  name: "",
  description: "",
  createdBy: "",
};

export const CreateRecipeLoadingText = [
  "Your recipe is simmering in our culinary database.",
  "Whipping up your recipe behind the scenes!",
  "Stirring the magic for your delicious recipe.",
  "Cooking up your creation in our recipe cauldron.",
  "Your recipe is marinating in our digital kitchen.",
  "Simmering the flavors of your recipe in our system.",
  "Baking your recipe to perfection in our data oven.",
  "Seasoning your recipe with care in our database pot.",
  "Letting your recipe simmer and stew in our backend.",
  "Slow-cooking your masterpiece in our digital kitchen.",
];
