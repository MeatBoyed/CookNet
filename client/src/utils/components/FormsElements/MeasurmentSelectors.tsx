import { Dispatch, SetStateAction, useEffect, useState } from "react";

const measurementsCat = ["Volume", "Weight", "Dry", "Conversions"];
const measurements = {
  volume: [
    "Teaspoon",
    "Tablespoon",
    "Fluid Ounce",
    "Cup",
    "Pint",
    "Quart",
    "Gallon",
    "Milliliter",
    "Liter",
  ],
  weight: ["Ounce", "Pound", "Gram", "Kilogram"],
  dry: ["Dash", "Pinch", "Smidgen", "Drop"],
  conversions: {
    tablespoonToTeaspoon: 3,
    cupToTablespoon: 16,
    fluidOunceToTablespoon: 2,
    pintToCup: 2,
    quartToCup: 4,
    gallonToCup: 16,
    ounceToGram: 28.35,
    poundToOunce: 16,
    kilogramToPound: 2.20462,
  },
};
export default function MeasurmentSelectors({
  measurement,
  setSelectedIngredient,
}: {
  measurement: string;
  setSelectedIngredient: Dispatch<
    SetStateAction<{
      id: string;
      quantity: number;
      measurement: string;
      optional: boolean;
      ingredientId: string;
      recipeId: string;
    }>
  >;
}) {
  const [type, setType] = useState<string>("");

  return (
    <>
      <select
        id={"Measurment"}
        value={measurement}
        onChange={(e) =>
          setSelectedIngredient((prev) => ({
            ...prev,
            measurement: e.target.value,
          }))
        }
        className="rounded border border-gray-300 px-2 py-1"
      >
        <option value={""} className="font-semibold">
          Amount
        </option>
        {type == "Volume" &&
          measurements.volume.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        {type == "Weight" &&
          measurements.weight.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        {type == "Dry" &&
          measurements.dry.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
      <select
        onChange={(e) => setType(e.target.value)}
        className="rounded border border-gray-300 px-2 py-1"
      >
        <option value={""} className="font-semibold">
          Measurment
        </option>
        {measurementsCat.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
