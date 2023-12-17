import { Badge } from "./badge";

interface Ingredient {
  quantity: number;
  name: string;
  optional?: boolean;
}

export default function Ingredient({ quantity, name, optional }: Ingredient) {
  return (
    <Badge variant={"secondary"} className="p-3 ">
      {quantity} {name} {optional && "(Optional)"}
    </Badge>
  );
}
