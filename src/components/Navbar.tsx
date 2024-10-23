"use client";
import React, { useEffect, useState } from "react";
import { FaFantasyFlightGames } from "react-icons/fa";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { ThemeProvider } from "./theme-provider";
import { ModeToggle } from "./Themetoggle";

const Navbar = () => {
  const { user, getCurrentUser } = useAuthStore();
  // const [isLoading, setIsLoading] = useState(true); // Local loading state

  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser();
      // setIsLoading(false); // Set loading to false after fetching
    };
    fetchUser();
  }, [getCurrentUser]);

  const pathname: string = usePathname();
  console.log(pathname);

  return (
    <nav className="flex items-center justify-between px-12 py-4 top-0 w-full h-16 fixed border-b border-[#b4b3b34b] z-50">
      <Link href={"/"}>
        <FaFantasyFlightGames className="text-4xl text-white" />
      </Link>
      <div className="flex gap-5 max-md:hidden text-white">
        <Link
          href={"/"}
          className={`rounded-full px-4 py-2 font-medium ${
            pathname === "/" ? "text-black bg-white" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href={"/topup"}
          className={`rounded-full px-4 py-2 font-medium ${
            pathname === "/topup" ? "text-black bg-white" : ""
          }`}
        >
          Topup
        </Link>
        <Link
          href={"/stock-account"}
          className={`rounded-full px-4 py-2 font-medium ${
            pathname === "/stock-account" ? "text-black bg-white" : ""
          }`}
        >
          Stock Accounts
        </Link>
        <Link
          href={"/posts"}
          className={`rounded-full px-4 py-2 font-medium ${
            pathname === "/posts" ? "text-black bg-white" : ""
          }`}
        >
          Posts
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <Link
              href={"/admin"}
              className="rounded-full overflow-hidden"
            >
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-10"
              />
            </Link>
            {user.role === "admin" && <span>(admin)</span>}
          </div>
        ) : (
          <Button className="rounded-full px-6 bg-white text-black hover:bg-gray-400">
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
