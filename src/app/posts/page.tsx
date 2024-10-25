"use client";

import Post from "@/components/Post";
import { userPostStore } from "@/store/postStore";
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
      <div className="h-screen w-full justify-center items-center text-white">
        <h1>Loading...</h1>
      </div>
    );
  }
  
  return (
    <div className="min-h-[calc(100vh-4rem)] text-white gradient-bg w-full flex  items-center flex-col">
      {posts.map((post) => (
        <Post post={post} key={post._id}/>
      ))}
    </div>
  );
};

export default UserPost;
