import Head from "next/head";
import Footer from "~/utils/components/Footer";
import Navbar from "~/utils/components/Navbar";
import { db } from "~/server/db";
import CreateRecipeForm from "~/utils/components/Forms/CreateRecipeForm";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const ingredients = await db.ingredient.findMany();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Head>
        <title>CookNet</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className=" flex min-h-screen flex-col items-center justify-center bg-white ">
        <CreateRecipeForm ingredients={ingredients} />
      </main>
      <Footer />
    </>
  );
}