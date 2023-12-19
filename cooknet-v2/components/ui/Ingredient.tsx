import { object, z } from "zod";
import { Badge } from "./badge";
import { measurementSchema } from "@/lib/utils";

export const IngredientSchema = object({
  name: z.string(),
  quantity: z.coerce.number(),
  measurement: measurementSchema,
  optional: z.boolean(),
});

export type TypeIngredient = z.infer<typeof IngredientSchema>;

export default function Ingredient({ props }: { props: TypeIngredient }) {
  return (
    <Badge variant={"secondary"} className="p-3 ">
      {props.quantity} {props.measurement} {props.name}{" "}
      {props.optional && "(Optional)"}
    </Badge>
  );
}
