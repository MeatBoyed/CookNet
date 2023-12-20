import { object, z } from "zod";
import { Badge } from "./badge";
import { measurementSchema } from "@/lib/utils";
import { Checkbox } from "./checkbox";

export const IngredientSchema = object({
  name: z.string(),
  quantity: z.coerce.number(),
  measurement: measurementSchema,
  // optional: z.coerce.boolean(),
  optional: z.string().optional(),
});

export type TypeIngredient = z.infer<typeof IngredientSchema>;

export default function Ingredient({
  props,
  isCooking,
}: {
  props: TypeIngredient;
  isCooking?: boolean;
}) {
  return (
    <Badge
      variant={"secondary"}
      className="flex justify-center items-center gap-2 p-3"
    >
      <div>
        {props.quantity} {props.measurement} {props.name}{" "}
        {props.optional && "(Optional)"}
      </div>
      {isCooking && <Checkbox />}
    </Badge>
  );
}
