import CallToAction from "~/utils/components/CallToAction";
import CategoriesSection from "~/utils/components/CategoriesSelection";
import Footer from "~/utils/components/Footer";
import Header from "~/utils/components/Header";
import Navbar from "~/utils/components/Navbar";
import RecipeCard from "~/utils/components/RecipeCard";

export const metadata = {
  title: "CookNet",
  description: "Just Do it - CookNet",
};

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <Navbar />
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
        <Footer />
      </main>
    </>
  );
}
