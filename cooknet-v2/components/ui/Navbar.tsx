import Link from "next/link";
import { Button } from "./button";

export default function Navbar() {
  const session = false;
  return (
    <nav className="flex w-full items-center justify-between border shadow-inner px-5 py-2">
      <Link href="/" className="text-2xl font-bold leading-normal">
        CookNet
      </Link>
      <div>
        <Button size={"sm"}>
          <Link
            href={"/api/auth/signin"}
            className="text-sm font-normal leading-normal text-white"
          >
            Log In
          </Link>
        </Button>
      </div>
    </nav>
  );
}
