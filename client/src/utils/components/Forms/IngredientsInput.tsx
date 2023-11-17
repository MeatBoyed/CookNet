import type { NextPage } from "next";
import Image from "next/image";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import InputField from "./TextField";

interface props {
  type?: string;
  name: string;
  initalValues?: string[];
  placeholder: string;
  onChange: (newValue: string[]) => void;
}

export const IngredientsInput: NextPage<props> = ({
  type,
  name,
  placeholder,
  initalValues,
  onChange,
}) => {
  const [item, setItem] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);

  const ingredients: string[] = [
    "All-purpose flour",
    "Granulated sugar",
    "Unsweetened cocoa powder",
    "Baking powder",
    "Pinch of salt",
    "Milk",
    "Vegetable oil",
    "Vanilla extract",
    "Chocolate chips",
  ];
  const selectedIngredients: string[] = [
    "All-purpose flour",
    "Granulated sugar",
    "Unsweetened cocoa powder",
    "Baking powder",
  ];

  useEffect(() => {
    setItems(initalValues ?? []);
  }, []);

  useEffect(() => {
    onChange(items);
  }, [items]);

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <div className="flex items-center justify-start">
        {selectedIngredients
          .sort((a, b) => a.length - b.length)
          .map((ingredient, index) => (
            <button
              key={index}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
            >
              <p>{ingredient}</p>
              <TiDeleteOutline size={30} />
            </button>
          ))}
      </div>

      <div className="flex w-full flex-col gap-5 border-2 border-black px-2 py-3">
        {/* Header */}
        <div className="flex w-full items-center justify-center gap-5">
          <InputField placeholder="Search" size="Small" type="text" />
          <InputField placeholder="Quantity" size="Small" type="number" />
          <button className="flex w-full items-center justify-center gap-2 rounded-full border border-black bg-black py-2 text-sm font-normal leading-normal text-white">
            Add Ingredients
          </button>
        </div>

        {/* Ingredients */}
        <div>
          {ingredients
            .sort((a, b) => a.length - b.length)
            .map((ingredient, index) => (
              <button
                key={index}
                className="mb-2 me-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
              >
                {ingredient}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
