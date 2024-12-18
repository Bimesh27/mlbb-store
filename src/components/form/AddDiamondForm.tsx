"use client";
import React, { useState } from "react";
import { MdDiamond } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDiamondStore } from "@/store/diamondStore";

interface FormData {
  price: number | undefined;
  amount: number | undefined;
  bonus: number | undefined;
}

const AddDiamondForm = () => {
  const { addDiamond } = useDiamondStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    price: undefined,
    amount: undefined,
    bonus: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Only allow numbers and decimal point
    if (!/^\d*\.?\d*$/.test(value) && value !== "") {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!formData.price || !formData.amount || !formData.bonus) {
      setError("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addDiamond(formData);

      setFormData({ price: 0, amount: 0, bonus: 0 });
    } catch (err : unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-lg w-full max-w-md p-8 flex flex-col border-gray-700 justify-center min-w-[22rem] items-center">
      <h1 className="flex items-center gap-2 justify-center text-xl font-semibold text-white">
        Add Diamond Package
        <MdDiamond className="text-2xl text-blue-500" />
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-8 gap-6 w-full">
        <div className="space-y-1">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="text"
            required
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            className="bg-black border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="text"
            required
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Quantity"
            className="bg-black border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="bonus">Bonus</Label>
          <Input
            id="bonus"
            name="bonus"
            type="text"
            required
            value={formData.bonus}
            onChange={handleChange}
            placeholder="Enter Bonus"
            className="bg-black border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !formData.price || !formData.amount || !formData.bonus}
          className="bg-blue-500 hover:bg-blue-600 px-8 py-2.5 font-semibold rounded-lg w-full disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Package"}
        </Button>
      </form>
    </div>
  );
};

export default AddDiamondForm;
