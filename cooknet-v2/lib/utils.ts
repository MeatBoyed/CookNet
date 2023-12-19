import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Measurments
export const measurementSchema = z.enum([
  "Empty",
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
