import type { NextPage } from "next";
import Image from "next/image";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import InputField from "./TextField";
import { Ingredient } from "@prisma/client";
import NumberInput from "./NumberInput";

interface props {
  type?: string;
  name: string;
  initalValues?: string[];
  placeholder: string;
  onChange: (selectedIngredients: Ingredient[]) => void;
}

export const IngredientsInput: NextPage<props> = ({
  type,
  name,
  placeholder,
  initalValues,
  onChange,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      name: "All-purpose Flour",
      quantity: 0,
      createdAt: new Date(),
      description: null,
    },
    {
      name: "Grandulated Sugar",
      quantity: 0,
      createdAt: new Date(),
      description: null,
    },
    {
      name: "Unsweetened cocoa power",
      quantity: 0,
      createdAt: new Date(),
      description: null,
    },
    {
      name: "Backing powder",
      quantity: 0,
      createdAt: new Date(),
      description: null,
    },
    {
      name: "Pinch of Salt",
      quantity: 0,
      createdAt: new Date(),
      description: null,
    },
    {
      name: "Vanilla extract",
      quantity: 0,
      createdAt: new Date(),
      description: null,
    },
    {
      name: "Chocolate chips",
      quantity: 0,
      createdAt: new Date(),
      description: null,
    },
  ]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>({
    name: "",
    quantity: 0,
    createdAt: new Date(),
    description: null,
  });

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <div className="flex items-center justify-start">
        {selectedIngredients
          .sort((a, b) => a.name.length - b.name.length)
          .map((ingredient, index) => (
            <button
              key={index}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
            >
              <p>{ingredient.name}</p>
              <TiDeleteOutline size={30} />
            </button>
          ))}
      </div>

      <div className="flex w-full flex-col gap-5 border-2 border-black px-2 py-3">
        {/* Header */}
        <div className="flex w-full items-center justify-center gap-5">
          <InputField
            onChange={() => null}
            placeholder="Search"
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
          <button
            onClick={() => {
              if (selectedIngredient.quantity > 0) {
                setSelectedIngredients((prev) => [...prev, selectedIngredient]);
                setSelectedIngredient({
                  name: "",
                  quantity: 0,
                  createdAt: new Date(),
                  description: null,
                });
                onChange(selectedIngredients);
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
                onClick={() => setSelectedIngredient(ingredient)}
                className="mb-2 me-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
              >
                {ingredient.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
