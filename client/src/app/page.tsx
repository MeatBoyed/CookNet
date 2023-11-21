import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import CallToAction from "~/utils/components/CallToAction";
import CategoriesSection from "~/utils/components/CategoriesSelection";
import Footer from "~/utils/components/Footer";
import Header from "~/utils/components/Header";
import Navbar from "~/utils/components/Navbar";
import RecipeCard from "~/utils/components/RecipeCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>CookNet</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Navbar />
        <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 py-8 ">
          <Header />
          <CategoriesSection />
          {/* <RecipeCard /> */}
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10">
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
