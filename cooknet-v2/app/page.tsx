import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Button>Hello See Me</Button> */}
      <RecipeCard />
    </main>
  );
}
