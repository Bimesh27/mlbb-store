"use client";
import ImageModal from "@/components/ImageModal";
import { useMlStore } from "@/store/mlAccountStore";
import React, { useEffect, useState } from "react";

const StockAccountPage = () => {
  const { posts, getPosts } = useMlStore();
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts();
    };
    fetchPosts();
  }, []);
  console.log(posts);

  const handleImageClick = (images : string [], index : number) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
  }

  return (
    <div className="min-h-screen w-full text-white flex justify-center py-2 ">
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col gap-6 justify-center bg-gray-900 border-b border-[#fafafa45] py-4 px-1 rounded-xl overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="text-xs font-semibold">
                  Posted on {new Date().toLocaleDateString()}
                </p>
                <p>{post.description}</p>
              </div>
              <p className=" text-xm font-bold px-4 py-1 rounded-xl cursor-pointer text-green-500">
                &#8377; {post.price}
              </p>
            </div>
            <div className="columns-2 rounded-lg overflow-hidden">
              {post.images.length === 1 ? (
                <img
                  src={post.images[0]}
                  alt="stock account"
                  className="w-full object-cover rounded-lg"
                  onClick={() => handleImageClick(post.images, 0)}
                />
              ) : (
                post.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt="stock account"
                    className="w-full min-h-[15rem] object-cover rounded-xl"
                    onClick={() => handleImageClick(post.images, idx)}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedImages && (
        <ImageModal
          images={selectedImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImages(null)}
        />
      )}
    </div>
  );
};

export default StockAccountPage;
