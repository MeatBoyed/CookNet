import CallToAction from "~/utils/components/CallToAction";
import CategoriesSection from "~/utils/components/CategoriesSelection";
import Header from "~/utils/components/Header";
import RecipeCard from "~/utils/components/RecipeCard";

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default function Home() {
  return (
    <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-8 ">
      <Header />
      <CategoriesSection />
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 ">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
      {/* <CallToAction /> */}
    </div>
  );
}
