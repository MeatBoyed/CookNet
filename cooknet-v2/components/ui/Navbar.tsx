import Link from "next/link";
import { Button } from "./button";
import {
  RedirectToSignUp,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
} from "@clerk/nextjs";

export default function Navbar() {
  const { user } = auth();
  return (
    <nav className="flex w-full items-center justify-between border shadow-inner px-10 py-2">
      <Link href="/" className="text-2xl font-bold leading-normal">
        CookNet
      </Link>
      <div className="flex justify-center items-center gap-3">
        <SignedIn>
          <Button size={"sm"}>
            <Link
              href={`/${user?.username}/r/create`}
              className="text-sm font-normal leading-normal text-white"
            >
              Create Recipe
            </Link>
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            <Link
              href={`/${user?.username}`}
              className="text-sm font-normal leading-normal text-white"
            >
              CookBook
            </Link>
          </Button>
        </SignedIn>
        <UserButton />
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}
