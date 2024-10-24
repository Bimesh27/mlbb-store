"use client";

import DiamondCard from "@/components/DiamondCard";
import Slider from "@/components/slider/Slider";
import { useDiamondStore } from "@/store/diamondStore";
import React, { useEffect, useState } from "react";
import { IoDiamond } from "react-icons/io5";

const LoadingCard = () => (
  <div className="border border-[#dadada46] p-4 rounded-xl w-48 h-32 animate-pulse max-md:w-full">
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="h-5 bg-gray-700 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
  </div>
);

const TopupPage = () => {
  // Add client-side only state
  const [isMounted, setIsMounted] = useState(false);
  const { diamonds, loading, getDiamond } = useDiamondStore();

  useEffect(() => {
    setIsMounted(true);
    getDiamond();
  }, [getDiamond]);

  // Return null on first render to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center text-white flex">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="text-white min-h-[calc(100vh-4rem)] flex flex-col items-center pb-8 md:py-8">
      {/* Slider Section */}
      <div className="w-full mb-8">
        <Slider />
      </div>

      {/* Title Section */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl uppercase font-bold">MLBB Diamond</h1>
        <IoDiamond className="text-blue-400 text-2xl" />
      </div>

      {/* Packages Section */}
      <div className="border border-[#fafafa3b] w-full max-w-4xl rounded-xl p-6 max-sm:border-none">
        <h2 className="text-xl font-bold text-center mb-6">PACKAGES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          {!isMounted || loading
            ? Array(6)
                .fill(0)
                .map((_, index) => <LoadingCard key={index} />)
            : diamonds?.map((diamond) => (
                <DiamondCard key={diamond._id} diamond={diamond} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default TopupPage;
