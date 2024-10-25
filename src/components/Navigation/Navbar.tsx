"use client";
import React, { useEffect, useState } from "react";
import { FaFantasyFlightGames } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { ThemeProvider } from "../theme-provider";
import { ModeToggle } from "../Themetoggle";

const Navbar = () => {
  const { user, getCurrentUser, loading } = useAuthStore();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsMounted(true);
      await getCurrentUser();
      // setIsLoading(false); // Set loading to false after fetching
    };
    fetchUser();
  }, [getCurrentUser]);

  const pathname: string = usePathname();
  console.log(pathname);

  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <nav className="flex items-center justify-between px-12 py-4 top-0 w-full h-16 fixed border-b border-[#b4b3b34b] z-50 bg-black">
      <Link href={"/"}>
        <FaFantasyFlightGames className="text-4xl text-white" />
      </Link>
      <div className="flex gap-5 text-white justify-center max-sm:text-sm max-sm:gap-0 items-center">
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
        <Link
          href={"/upload"}
          className={`rounded-full px-4 py-2 font-medium ${
            pathname === "/upload" ? "text-black bg-white" : ""
          }`}
        >
          Upload
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${user._id}`}
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
