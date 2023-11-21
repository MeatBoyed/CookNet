"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data } = useSession();

  return (
    <nav className="flex h-20 w-full flex-col items-center justify-center border-b-[1px] border-b-black bg-white px-16 shadow-inner">
      <div className="flex w-full items-center justify-between ">
        <div className="flex items-start justify-start">
          <Link
            href="/"
            className="text-2xl font-bold leading-normal text-black"
          >
            CookNet
          </Link>
        </div>
        <div className="flex items-center justify-center gap-8 bg-white">
          <div className="flex items-start justify-start gap-8">
            <div className="text-base font-normal leading-normal text-black">
              Link One
            </div>
            <div className="text-base font-normal leading-normal text-black">
              Link Two
            </div>
            <div className="text-base font-normal leading-normal text-black">
              Link Three
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className=" text-base font-normal leading-normal text-black">
                Link Four
              </div>
              <div className="relative h-6 w-6" />
            </div>
          </div>
          {data ? (
            <div className="flex items-center justify-center gap-4">
              {data.user.name}
              <button className="flex items-center justify-center gap-2 border border-black bg-black px-5 py-2">
                <div className="text-base font-normal leading-normal text-white">
                  My Recipes
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <button
                className="flex items-center justify-center gap-2 border border-black px-5 py-2"
                onClick={() => signIn()}
              >
                <div className="text-base font-normal leading-normal text-black">
                  Log in
                </div>
              </button>
              <button className="flex items-center justify-center gap-2 border border-black bg-black px-5 py-2">
                <div className="text-base font-normal leading-normal text-white">
                  Get started
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
