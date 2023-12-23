import { Dot, Heart } from "lucide-react";
import Link from "next/link";

interface RecipeMetaDataProps {
  username: string;
  createdAt: Date;
}
export default function RecipeMetaData({
  username,
  createdAt,
}: RecipeMetaDataProps) {
  return (
    <div className="flex justify-start items-center">
      <Link href={`/${username}`} className="text-xs capitalize">
        {username}
      </Link>
      <Dot />
      <p className="text-xs tracking-widest">
        {createdAt.toLocaleDateString()}
      </p>
      {/* <Dot />
      <div className="flex justify-center items-center gap-1">
        <Heart size={15} className="text-red-500" />
        <p className="text-xs">3</p>
      </div> */}
    </div>
  );
}
