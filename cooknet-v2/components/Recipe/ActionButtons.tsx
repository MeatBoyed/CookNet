import { Heart } from "lucide-react";
import { Button } from "../ui/button";

export default function ActionButtons() {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button>CookNet</Button>
      <Button variant={"outline"}>Add to CookBook</Button>
      <div className="flex justify-center items-center gap-1">
        <Heart size={25} className="text-red-500" />
        <p className="text-lg text-center">3</p>
      </div>
    </div>
  );
}
