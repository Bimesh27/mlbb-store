"use client";

import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaFantasyFlightGames } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const router = useRouter();
  const {login} = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPasswordError("");
    try {
      setLoading(true);
      await login({
        email: formData.email,
        password: formData.password,
      })
      
    } catch (error: any) {
      // console.error("Signup failed. Please try again.");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // Display the error message from the server if it exists
      } else {
        toast.error("Login failed. Please try again."); // Fallback error message
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-white">
      <div className="w-[40%] max-lg:w-full h-[70%] border shadow-2xl rounded-xl flex flex-col items-center sm:p-10 gap-3 max-sm:justify-center max-sm:h-full sm:mt-10">
        <FaFantasyFlightGames className="text-5xl" />
        <h1 className="font-semibold text-3xl">Login</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex items-center border py-3 px-4 rounded-xl gap-3 mt-2">
            <MdOutlineEmail className="text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="outline-none w-56 bg-transparent"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border py-3 px-4 rounded-xl gap-3 mt-2">
            <RiLockPasswordLine className="text-xl" />
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter Password"
              name="password"
              className="outline-none w-56 bg-transparent"
              required
              onChange={handleChange}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <FaEye className="text-xl" />
              ) : (
                <FaEyeSlash className="text-xl" />
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all mt-4 rounded-xl"
            disabled={loading}
          >
            {loading ? "Logging..." : "Login"}
          </Button>
        </form>
        <p className="font-medium text-sm">
          Dont have an account ?{" "}
          <Link href={"/signup"} >
            Signup here!
          </Link>
        </p>
      </div>
      {/* <ToastContainer/> */}
    </div>
  );
}
