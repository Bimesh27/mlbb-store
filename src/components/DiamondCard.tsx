// "use client"

import { IoDiamond } from "react-icons/io5";

interface Diamond {
  _id: string;
  amount: number;
  price: number;
  bonus?: number;
}

interface DiamondCardProps {
  diamond: Diamond;
}

const DiamondCard = ({ diamond }: DiamondCardProps) => (
  <div className="border border-[#dadada46] p-4 rounded-xl min-w-60 h-32 flex flex-col justify-between hover:border-blue-400 transition-colors max-sm:w-full">
    <div className="flex items-center gap-2">
      <IoDiamond className="text-blue-400 text-xl " />
      <span className="font-medium">Diamond Package</span>
    </div>
    <div>
      <p className="text-lg font-bold">&#8377;{diamond.price}</p>
      <p className="text-sm text-gray-300">
        {diamond.amount} + {diamond.bonus} Diamonds
      </p>
    </div>
  </div>
);

export default DiamondCard;