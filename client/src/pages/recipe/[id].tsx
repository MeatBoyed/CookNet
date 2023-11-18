import Head from "next/head";
import Footer from "~/utils/components/Footer";
import Navbar from "~/utils/components/Navbar";
import Maininfo from "~/utils/components/RecipePage/MainInfo";
import StepCard from "~/utils/components/RecipePage/StepCard";

export default function RecipePage() {
  const steps: string[] = [
    "Take a microwave-safe mug; make sure it's large enough to avoid overflow.",
    "In the mug, whisk together the flour, sugar, cocoa powder, baking powder, and a pinch of salt until well mixed.",
    "Pour in the milk, vegetable oil, and vanilla extract into the mug. Stir until the batter is smooth and no lumps remain.",
    "If you're feeling a bit extra chocolaty, toss in a tablespoon of chocolate chips and give it a gentle stir.",
    "Place the mug in the microwave and cook on high for 1 minute and 30 seconds. Cooking times may vary, so keep an eye on it to avoid overcooking.",
    "After microwaving, carefully remove the mug (it will be hot!). The cake should be firm to the touch on top.",
    "Allow the cake to cool for a minute or two before digging in. This time is perfect for adding a scoop of ice cream or a dusting of powdered sugar.",
    "Grab a spoon and savor the warm, gooey goodness of your microwave chocolate cake. It's quick, easy, and oh-so-satisfying!",
  ];
  return (
    <>
      <Head>
        <title>CookNet</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className=" flex min-h-screen flex-col items-center justify-center bg-white ">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Maininfo />
          <div className="mt-10 flex flex-wrap items-start justify-center gap-5 ">
            {steps.map((step, index) => (
              <StepCard step={step} key={index} stepNo={index + 1} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
