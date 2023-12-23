"use client";
import { Ingredient, IngredientOnRecipe } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IngredientIcon, {
  CombinedIngredient,
  SelectIngredientIcon,
} from "./ui/IngredientIcon";
import { getIngredients } from "@/app/actions/IngredientActions";
import CreateIngredientDialog from "./Forms/CreateIngredientDialog";
import { ToolTip } from "./ToolTip";
import SelectIngredientForm from "./Forms/SelectIngredientForm";

// export type IngredientOnRecipeOmit = Omit<
//   IngredientOnRecipe,
//   "id" | "recipeId"
// >;

export type IngredientOnRecipeOmit = {
  id?: string;
  quantity: number;
  measurement: string;
  optional: boolean;
  ingredientId: string;
};

export default function IngredientsInput({
  errorMessage,
  selectedIngredients,
  setSelectedIngredients,
}: {
  errorMessage?: string;
  selectedIngredients: IngredientOnRecipeOmit[];
  setSelectedIngredients: Dispatch<SetStateAction<IngredientOnRecipeOmit[]>>;
}) {
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientOnRecipeOmit>({
      ingredientId: "",
      measurement: "",
      optional: false,
      quantity: 0,
    });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | undefined>("");

  useEffect(() => {
    setError(undefined);
    const fetch = async () => {
      const res = await getIngredients();

      if (res.error) return setError(res.error);
      if (res.data) return setIngredients(res.data);
    };

    fetch();
  }, []);

  return (
    <>
      <section
        id="Ingredients"
        className="flex flex-col justify-center items-start gap-5 w-full"
      >
        <div className="w-full flex flex-col justify-center items-start">
          <div className="flex justify-between items-center w-full">
            <p className="text-base font-semibold tracking-widest">
              Add Ingredients
            </p>
            <CreateIngredientDialog setIngredients={setIngredients} />
          </div>
          <p className="text-destructive text-sm">
            {error && error}
            {errorMessage && errorMessage}
          </p>
        </div>
        {/* Add border for Heirachy of ingredients */}
        <div className="flex justify-start items-start gap-2 flex-wrap w-full border p-3">
          {ingredients.map((ingredient, index) => (
            <div
              onClick={() => {
                if (selectedIngredient.ingredientId === ingredient.id) {
                  return setSelectedIngredient((prev) => ({
                    ...prev,
                    ingredientId: "",
                  }));
                }
                setSelectedIngredient((prev) => ({
                  ...prev,
                  ingredientId: ingredient.id,
                }));
              }}
            >
              <SelectIngredientIcon
                ingredient={ingredient}
                key={index}
                selected={
                  selectedIngredient.ingredientId === ingredient.id
                    ? true
                    : false
                }
              />
            </div>
          ))}
        </div>
        {/* Display Input Form if ingredient selected & update the Selected Recipe State */}
        {selectedIngredient.ingredientId != "" && (
          <SelectIngredientForm
            onSubmit={(finishedIngredient) => {
              setSelectedIngredients((prev) => [...prev, finishedIngredient]);
              setSelectedIngredient({
                ingredientId: "",
                measurement: "",
                optional: false,
                quantity: 0,
              });
            }}
            selectedIngredient={selectedIngredient}
          />
        )}

        {/* Render their selected recipe state */}
        <div className="flex flex-col justify-center items-start gap-3">
          <div className="flex justify-center items-center gap-3">
            <p className="text-sm font-semibold tracking-widest">
              Your Selected Ingredients
            </p>
            <ToolTip message="Click on Selected Recipes to Remove them" />
          </div>

          <div className="flex justify-start items-start gap-2 flex-wrap w-full">
            {selectedIngredients.map((sIngredeint, index) => {
              const ingredient = ingredients.find(
                (ingre) => ingre.id === sIngredeint.ingredientId
              );
              if (!ingredient) return;

              const Ingre: CombinedIngredient = {
                id: "",
                ingredient: ingredient,
                recipeId: "",
                ingredientId: sIngredeint.ingredientId,
                measurement: sIngredeint.measurement,
                optional: sIngredeint.optional,
                quantity: sIngredeint.quantity,
              };

              return (
                <div
                  onClick={() => {
                    const newList = selectedIngredients.filter(
                      (ingre) => ingre != sIngredeint
                    );
                    setSelectedIngredients(newList);
                  }}
                  className="hover:cursor-pointer hover:bg-destructive rounded-3xl"
                >
                  <IngredientIcon key={index} props={Ingre} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
