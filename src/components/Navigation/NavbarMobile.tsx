"use client";
import Link from 'next/link'
import React from 'react'
import { FaShop } from 'react-icons/fa6';
import { IoDiamondOutline } from 'react-icons/io5';
import { GoHomeFill } from 'react-icons/go';
import { MdFileUpload } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { BsFilePost } from 'react-icons/bs';
import useAuthStore from '@/store/authStore';
import { Button } from '../ui/button';

const NavbarMobile = () => {
  const {user} = useAuthStore();
  const pathname: string = usePathname();

  return (
    <div className="fixed h-16 bottom-0 w-full text-white z-50 bg-black items-center justify-evenly flex">
      <Link href={"/"} className="underline decoration-orange-600">
        <GoHomeFill
          className={`text-2xl ${pathname === "/" ? "text-orange-500" : ""}`}
        />
      </Link>
      <Link href={"/topup"}>
        <IoDiamondOutline
          className={`text-2xl ${
            pathname === "/topup" ? "text-orange-500" : ""
          }`}
        />
      </Link>
      <Link href={"/stock-account"}>
        <FaShop
          className={`text-2xl ${
            pathname === "/stock-account" ? "text-orange-500" : ""
          }`}
        />
      </Link>
      <Link href={"/posts"}>
        <BsFilePost
          className={`text-2xl ${
            pathname === "/posts" ? "text-orange-500" : ""
          }`}
        />
      </Link>
      <Link href={"/upload"}>
        <MdFileUpload
          className={`text-2xl ${
            pathname === "/upload" ? "text-orange-500" : ""
          }`}
        />
      </Link>
      {user ? (
        <div className="flex items-center gap-2">
          <Link href={"/admin"} className="rounded-full overflow-hidden">
            <img
              src={user.profilePicture}
              alt={user.username}
              className="w-8"
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
  );
}

export default NavbarMobile