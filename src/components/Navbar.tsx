import React from "react";
import { FaFantasyFlightGames } from "react-icons/fa";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-12 py-4 glass-bg top-0 w-full h-16 fixed border-b border-[#b4b3b3]">
      <Link href={"/"}>
        <FaFantasyFlightGames className="text-4xl text-blue-600" />
      </Link>
      <Link href={"/login"}>
        <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
