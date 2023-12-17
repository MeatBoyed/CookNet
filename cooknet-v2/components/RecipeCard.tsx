import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import CheeseBurger from "../public/Alien Cheesburger.png";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Dot, Heart, HeartIcon } from "lucide-react";

export default function RecipeCard() {
  return (
    <Card>
      <Image src={CheeseBurger} alt="Thumbnail" className="w-full" />
      <CardHeader className="p-3">
        <div className="flex justify-start items-center">
          <Link href="/" className="text-xs">
            Charles Rossouw
          </Link>
          <Dot />
          <p className="text-xs">21/3/23</p>
          <Dot />
          <div className="flex justify-center items-center gap-1">
            <Heart size={15} className="text-red-500" />
            <p className="text-xs">3</p>
          </div>
        </div>
        <Link href="/charles/cheese">
          <CardTitle>Alien Cheeseburger</CardTitle>
        </Link>
        <CardDescription>
          An alien cheese burger is a delicious and exotic dish that can be made
          with ingredients from other planets
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-start items-start gap-2 p-3 flex-wrap">
        <Badge variant={"secondary"}>Beef Patty</Badge>
        <Badge variant={"secondary"}>Beef Patty</Badge>
        <Badge variant={"secondary"}>Beef Patty</Badge>
        <Badge variant={"secondary"}>Beef Patty</Badge>
        <Badge variant={"secondary"}>Beef Patty</Badge>
        <Badge variant={"secondary"}>Beef Patty</Badge>
      </CardContent>
    </Card>
  );
}
