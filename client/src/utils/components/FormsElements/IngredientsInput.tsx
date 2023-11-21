"use client";

import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import InputField from "./TextField";
import { type IngredientOnRecipe, type Ingredient } from "@prisma/client";
import NumberInput from "./NumberInput";
import MeasurmentSelectors from "./MeasurmentSelectors";

interface props {
  ingredients: Ingredient[];
  onChange: (selectedIngredients: IngredientOnRecipe[]) => void;
}

const DefaultState: IngredientOnRecipe = {
  id: "",
  ingredientId: "",
  measurement: "",
  optional: false,
  quantity: 0,
  recipeId: "",
};

// Show highlighting of Selected Ingredient (changing the ingredientId Prop button/item)

export default function IngredientsInput({ ingredients, onChange }: props) {
  // Currently Selected Ingredeient for Recipe ()
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientOnRecipe[]
  >([]);

  // Currently Selected Ingredient
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientOnRecipe>(DefaultState);

  return (
    <div className="flex w-full flex-col justify-center gap-5">
      <div className="flex items-center justify-start">
        {selectedIngredients.map((ingredient, index) => (
          <button
            key={index}
            className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
          >
            <p>
              {ingredient.quantity} {ingredient.measurement}{" "}
              {
                ingredients.find((ingre) => ingre.id == ingredient.ingredientId)
                  ?.name
              }{" "}
              {ingredient.optional && "(Optional)"}
            </p>
            <TiDeleteOutline
              size={30}
              onClick={() =>
                setSelectedIngredients(
                  selectedIngredients.filter((ingre) => ingre != ingredient),
                )
              }
            />
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col gap-5 border-2 border-black px-2 py-3">
        {/* Header */}
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <InputField
            onChange={() => null}
            placeholder="Search Ingredients"
            size="Small"
            type="text"
          />
          <NumberInput
            onChange={(newValue) =>
              setSelectedIngredient((prev) => ({ ...prev, quantity: newValue }))
            }
            value={selectedIngredient.quantity}
            placeholder="Quantity"
            size="Small"
            type="number"
          />
          <div className="flex w-full items-center justify-between ">
            <MeasurmentSelectors
              onChange={(newMeasurment) =>
                setSelectedIngredient((prev) => ({
                  ...prev,
                  measurement: newMeasurment,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm font-semibold leading-[21px] text-black">
              Optional
            </p>
            <input
              type="checkbox"
              onChange={(e) =>
                setSelectedIngredient((prev) => ({
                  ...prev,
                  optional: e.target.checked,
                }))
              }
            />
          </div>
          <button
            onClick={() => {
              if (
                selectedIngredient.quantity > 0 &&
                selectedIngredient.measurement != "" &&
                selectedIngredient.ingredientId != ""
              ) {
                setSelectedIngredients((prev) => [...prev, selectedIngredient]);
                onChange(selectedIngredients);
                setSelectedIngredient(DefaultState);
              }
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-black bg-black py-2 text-sm font-normal leading-normal text-white"
          >
            Add Ingredient
          </button>
        </div>

        {/* Ingredients */}
        <div>
          {ingredients
            .sort((a, b) => a.name.length - b.name.length)
            .map((ingredient, index) => (
              <button
                key={index}
                onClick={() =>
                  setSelectedIngredient((prev) => ({
                    ...prev,
                    ingredientId: ingredient.id,
                  }))
                }
                className="rounded border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
              >
                {ingredient.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
