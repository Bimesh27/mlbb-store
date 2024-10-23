"use client";

import { useDiamondStore } from "@/store/diamondStore";
import React, { useEffect } from "react";

const TopupPage = () => {
  const { diamonds, loading, getDiamond } = useDiamondStore();

  useEffect(() => {
    const fetchDiamond = async () => {
      await getDiamond();
    };
    fetchDiamond();
  }, [getDiamond]);
  console.log(diamonds);
  

  return (
    <div className="text-white">
      <h1>Mlbb Diamond Price</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {diamonds.map((d) => (
            <div key={d.id}>
              <h1>{d.amount}</h1>
              <h1>{d.price}</h1>
              <h1>{d.bonus}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopupPage;
