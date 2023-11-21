"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data } = useSession();

  return (
    <nav className="flex w-full items-center justify-between border-b-[1px] border-b-black bg-white p-2  shadow-inner">
      <Link href="/" className="text-2xl font-bold leading-normal text-black">
        CookNet
      </Link>
      <div className="bg-white">
        {/* <div className="flex hidden w-full items-center justify-center gap-3 ">
            <div className="text-base font-normal leading-normal text-black">
              Link One
            </div>
            <div className="text-base font-normal leading-normal text-black">
              Link Three
            </div>
            <div className=" text-base font-normal leading-normal text-black">
              Link Four
            </div>
          </div> */}
        {data ? (
          <button className="flex items-center justify-center gap-2 border border-black bg-black px-5 py-2">
            <p className="text-base font-normal leading-normal text-white">
              {/* My Recipes */}
              Profile
            </p>
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="flex items-center justify-center gap-2 border border-black bg-black p-2"
          >
            <p className="text-base font-normal leading-normal text-white">
              Log In
            </p>
          </button>
        )}
      </div>
    </nav>
  );
}
