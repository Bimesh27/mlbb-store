"use client";

import { userPostStore } from "@/store/postStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserPost = () => {
  const { posts, getPost, loading } = userPostStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    getPost();
  }, [userPostStore]);
  console.log(posts);

  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] text-white gradient-bg w-full flex  items-center flex-col">
      {posts.map((post) => (
        <div
          key={post._id}
          className=" w-fit p-4 gap-2 flex flex-col bg-[#131313] h-fit border-b border-[#dafafa5b]"
        >
          <Link href={`profile/${post.createdBy._id}`}>
            <div className="flex gap-2 items-center">
              <img
                src={post?.createdBy?.profilePicture}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <h1 className="font-semibold">{post?.createdBy?.username}</h1>
            </div>
          </Link>
          <h1>{post.description}</h1>
          <img src={post.image} className="rounded-xl w-96 sm:w-[30rem] h-auto" />
        </div>
      ))}
    </div>
  );
};

export default UserPost;
