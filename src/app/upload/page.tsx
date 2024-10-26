"use client";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import { userPostStore } from "@/store/postStore";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { MdUpload } from "react-icons/md";

interface UploadPostCredentials {
  description: string;
  image: string;
  createdBy: string;
}

const UploadPostPage = () => {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const { uploadPost } = userPostStore();
  const { user, loading } = useAuthStore();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<UploadPostCredentials>({
    description: "",
    image: "",
    createdBy: user?.id || "",
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({ ...prev, image: base64 }));
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
    setError(null);
  };

  const handleUpload = async () => {
    if (!formData.image || !formData.description.trim()) {
      setError("Both image and description are required");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      await uploadPost(formData);

      // Reset form after successful upload
      setFormData({
        description: "",
        image: "",
        createdBy: user?.id || "",
      });
      router.push("/posts");
      // Reset file input
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to upload post");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-white">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-6 p-4 text-white">
      <div className="flex items-center gap-4">
        <img
          src={user?.profilePicture}
          alt="Profile"
          className="h-14 w-14 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="border-b border-white bg-transparent p-2 outline-none focus:border-green-500"
          value={formData.description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="flex min-h-[25rem] min-w-[20rem] max-w-[35rem] cursor-pointer border border-dotted border-[#dadada6d] p-4 transition-all hover:border-green-500 justify-center items-center">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={imageRef}
          onChange={handleImageChange}
        />

        {formData.image ? (
          <img
            src={formData.image}
            alt="Preview"
            className="max-h-full w-full object-contain"
            onClick={() => imageRef.current?.click()}
          />
        ) : (
          <div
            className="flex h-full w-full gap-2 flex-col items-center justify-center"
            onClick={() => imageRef.current?.click()}
          >
            <MdUpload className="h-20 w-20" />
            <span className="text-sm text-gray-300">Click to upload image</span>
          </div>
        )}
      </div>

      {error && <span className="text-red-500">{error}</span>}

      <Button
        className="rounded-xl bg-green-600 px-8 py-2 font-medium hover:bg-green-700 disabled:opacity-50"
        onClick={handleUpload}
        disabled={
          isUploading || !formData.image || !formData.description.trim()
        }
      >
        {isUploading ? "Uploading..." : "Upload Post"}
      </Button>
    </div>
  );
};

export default UploadPostPage;
