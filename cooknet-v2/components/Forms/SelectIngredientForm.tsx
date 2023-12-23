import { useState } from "react";
import { IngredientOnRecipeOmit } from "../IngredientsInput";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { object, z } from "zod";
import { measurementSchema, measurements } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

const IngredientFormSchema = object({
  quantity: z.coerce
    .number()
    .min(0.0001, { message: "Please enter a valid Quantity" }),
  measurement: measurementSchema,
  // optional: z.coerce.boolean(),
  optional: z.string().optional(),
});

type IngredientForm = z.infer<typeof IngredientFormSchema>;

interface props {
  selectedIngredient: IngredientOnRecipeOmit;
  onSubmit: (selectedIngredient: IngredientOnRecipeOmit) => void;
}

export default function SelectIngredientForm({
  onSubmit,
  selectedIngredient,
}: props) {
  const [error, setError] = useState<string | undefined>();
  const ingredientForm = useForm<IngredientForm>({
    resolver: zodResolver(IngredientFormSchema),
    defaultValues: {
      quantity: 0,
      measurement: "Empty",
      optional: "",
    },
  });

  /**
   * Create finished Selected Ingredient object,
   * and pass it to the parent
   * @param input
   * @returns
   */
  const onHandleSubmit = async (input: IngredientForm) => {
    setError(undefined);
    if (input.measurement === "Empty")
      return setError("Please select a Measurement");

    // Ingredient
    const finishedSelect = {
      ...selectedIngredient,
      quantity: input.quantity,
      measurement: input.measurement,
      optional: input.optional === "true" ? true : false,
    };

    onSubmit(finishedSelect);
  };

  return (
    <Form {...ingredientForm}>
      <form
        onSubmit={ingredientForm.handleSubmit(onHandleSubmit)}
        className="flex justify-center items-center flex-col gap-5 w-full"
      >
        <div className="w-full flex justify-center items-center gap-2 ">
          {/* Search Field */}
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
                      value="Empty"
                      className="font-semibold tracking-widest "
                    >
                      Measurements
                    </option>
                    {measurements.map((option, index) => (
                      <option className="text-sm" key={index} value={option}>
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
                      field.onChange(event)
                    }
                  />
                </FormControl>
                <FormLabel>Optional</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-4">
          <Button className="w-full" type="submit">
            Add Ingredient
          </Button>
        </div>
        <p className="font-semibold text-destructive">{error && error}</p>
      </form>
    </Form>
  );
}
