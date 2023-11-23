import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { authOptions } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

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
        {session ? (
          <div className="flex items-center justify-center gap-5">
            <button className="flex items-center justify-center gap-2 border border-black bg-black px-2 py-2">
              <Link
                className="text-sm font-normal leading-normal text-white"
                href={`/user/${session.user.id}`}
              >
                Cook Book
              </Link>
            </button>
            <Link
              className="text-base font-normal leading-normal text-black"
              href={"/api/auth/signout"}
            >
              <MdOutlineLogout size={25} />
            </Link>
          </div>
        ) : (
          <button className="flex items-center justify-center gap-2 border border-black bg-black p-2">
            <Link
              href={"/api/auth/signin"}
              className="text-sm font-normal leading-normal text-white"
            >
              Log In
            </Link>
          </button>
        )}
      </div>
    </nav>
  );
}
