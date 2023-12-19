import Image from "next/image";
import ActionButtons from "@/components/Recipe/ActionButtons";
import Ingredients from "@/components/Recipe/Ingredients";
import RecipeHeader from "@/components/Recipe/RecipeHeader";
import Steps from "@/components/Recipe/Steps";

import CheeseBurger from "../../../../public/Alien Cheesburger.png";
import RecipeForm from "@/components/Forms/RecipeForm";

export default function CreateRecipePage() {
  return (
    <RecipeForm />
    // <main className="flex min-h-screen flex-col items-start justify-between p-10 gap-10 lg:flex-row ">
    //   {/* <Button>Hello See Me</Button> */}
    //   <ActionButtons />
    //   <Image
    //     width={500}
    //     height={500}
    //     src={CheeseBurger}
    //     alt="Thumbnail"
    //     className="w-full"
    //   />
    //   <div className="flex justify-center items-start flex-col gap-10">
    //     <RecipeHeader />
    //     <Ingredients />
    //     <Steps />
    //   </div>
    // </main>
  );
}
