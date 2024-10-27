"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdUpload, MdClose } from "react-icons/md";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMlStore } from "@/store/mlAccountStore";

interface ImageFile {
  url: string;
  file: string; // Changed from File to string
}

interface FormData {
  description: string;
  price: string;
}

const StockAccountForm = () => {
  const { addPost } = useMlStore();
  const imageRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [formData, setFormData] = useState<FormData>({
    description: "",
    price: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > 4) {
      setError("You can only upload up to 4 images");
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload only image files");
        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Each image must be less than 5MB");
        return false;
      }

      return true;
    });

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [
          ...prev,
          {
            url: reader.result as string,
            file: reader.result as string, // Store the base64 string instead of File object
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // For price field, only allow numbers and decimal point
    if (name === "price" && !/^\d*\.?\d*$/.test(value) && value !== "") {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    // Validate form data
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError("Please enter a valid price");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    try {
      setIsUploading(true);
      setError("");

      // Here you would typically create a FormData object with all the data
      const postData = {
        description: formData.description,
        price: parseFloat(formData.price),
        images: images.map((img) => img.file), // Now sending array of strings
      };

      await addPost(postData);

      // Reset form after successful upload
      setImages([]);
      setFormData({ description: "", price: "" });
    } catch (err) {
      setError("Failed to upload post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border rounded-lg w-full max-w-md flex p-4 flex-col border-gray-700 items-center bg-gray-900 min-h-[26rem]">
      <h1 className="my-6 text-xl font-semibold">Add Stock Account</h1>
      <div className="flex w-full flex-col items-center justify-center gap-6 p-4 text-white">
        <div className="grid grid-cols-2 gap-4 w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg border border-gray-600 overflow-hidden"
            >
              <img
                src={image.url}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              >
                <MdClose className="h-4 w-4" />
              </button>
            </div>
          ))}

          {images.length < 4 && (
            <div
              className="aspect-square flex cursor-pointer border-2 border-dashed rounded-lg border-gray-600 transition-all hover:border-green-500 justify-center items-center"
              onClick={() => imageRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
                multiple
              />
              <div className="flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                <MdUpload className="h-8 w-8 mb-2" />
                <span className="text-sm">Upload Image</span>
                <span className="text-xs text-gray-500 mt-1">
                  {4 - images.length} slot{images.length === 3 ? "" : "s"}{" "}
                  remaining
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 w-full">
          <div className="space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="bg-black border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="bg-black border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="w-full">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          className="w-full rounded-lg bg-green-600 px-8 py-2 font-medium hover:bg-green-700 disabled:opacity-50"
          onClick={handleUpload}
          disabled={
            isUploading ||
            images.length === 0 ||
            !formData.description.trim() ||
            !formData.price
          }
        >
          {isUploading ? "Uploading..." : "Upload Post"}
        </Button>
      </div>
    </div>
  );
};

export default StockAccountForm;
