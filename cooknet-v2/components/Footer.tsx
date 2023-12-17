import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full items-center justify-center border shadow-inner p-10 gap-5">
      <Link href="/" className="text-2xl font-bold leading-normal">
        CookNet
      </Link>
      <p className="text-sm font-normal">
        © {new Date().getFullYear()} Nerf Designs. All rights reserved.
      </p>
    </footer>
  );
}
