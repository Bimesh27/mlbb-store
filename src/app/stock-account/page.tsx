"use client";
import { useMlStore } from "@/store/mlAccountStore";
import React, { useEffect } from "react";

const StockAccountPage = () => {
  const { posts, getPosts } = useMlStore();

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts();
    };
    fetchPosts();
  }, []);
  console.log(posts);
  

  return (
    <div className="min-h-screen w-full text-white flex justify-center py-2">
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
              <p className="bg-green-600 text-xm font-semibold px-4 py-1 rounded-xl cursor-pointer">
                &#8377; {post.price}
              </p>
            </div>
            <div className="columns-2">
              {post.images.length === 1 ? (
                <img
                  src={post.images[0]}
                  alt="stock account"
                  className="w-full object-cover rounded-lg"
                />
              ) : (
                post.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt="stock account"
                    className="w-full min-h-[15rem] object-cover rounded-lg"
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockAccountPage;
