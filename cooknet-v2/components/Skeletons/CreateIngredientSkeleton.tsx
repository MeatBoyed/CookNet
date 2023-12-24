import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

export default function CreateIngredientSkeleton() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 ">
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <Label>Name:</Label>
        <Skeleton className="w-full h-10" />
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full">
        <Label>Description:</Label>
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}
