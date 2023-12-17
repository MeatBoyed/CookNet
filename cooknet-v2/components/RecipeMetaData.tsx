import { Dot, Heart } from "lucide-react";
import Link from "next/link";

export default function RecipeMetaData() {
  return (
    <div className="flex justify-start items-center">
      <Link href="/" className="text-xs">
        Charles Rossouw
      </Link>
      <Dot />
      <p className="text-xs">21/3/23</p>
      {/* <Dot />
      <div className="flex justify-center items-center gap-1">
        <Heart size={15} className="text-red-500" />
        <p className="text-xs">3</p>
      </div> */}
    </div>
  );
}
