"use server";

import { currentUser, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import prisma from "./db";

export default async function GetValidUser() {
  const user = await currentUser();

  // Ensure they're Authed
  if (!user) return redirect("/sign-in");

  // Ensure they in Db
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  // They haven't done the onboarding
  if (!dbUser || dbUser?.familyClan === "" || dbUser?.referral === "")
    return redirect("/onboarding");

  return user;
}
