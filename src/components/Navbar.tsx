"use client"
import React from "react";
import { FaFantasyFlightGames } from "react-icons/fa";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname : string = usePathname();
  console.log(pathname);
  
  return (
    <nav className="flex items-center justify-between px-12 py-4 glass-bg top-0 w-full h-16 fixed border-b border-[#b4b3b3] z-50">
      <Link href={"/"}>
        <FaFantasyFlightGames className="text-4xl text-blue-600" />
      </Link>
      <div className="flex gap-5 max-md:hidden">
        <Link
          href={"/"}
          className={`rounded-full px-4 py-2 font-medium text-black ${pathname === "/" ? "underline decoration-blue-600": ""}`}
        >
          Home
        </Link>
        <Link
          href={"/topup"}
          className={`rounded-full px-4 py-2 font-medium text-black ${pathname === "/topup" ? "underline decoration-blue-600": ""}`}
        >
          Topup
        </Link>
        <Link
          href={"/stock-account"}
          className={`rounded-full px-4 py-2 font-medium text-black ${pathname === "/stock-account" ? "underline decoration-blue-600": ""}`}
        >
          Stock Accounts
        </Link>
        <Link
          href={"/posts"}
          className={`rounded-full px-4 py-2 font-medium text-black ${pathname === "/posts" ? "underline decoration-blue-600": ""}`}
        >
          Posts
        </Link>
      </div>
      <Link href={"/login"}>
        <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
