"use client";

import Post from "@/components/Post";
import useAuthStore from "@/store/authStore";
import { userPostStore } from "@/store/postStore";
import React, { useEffect } from "react";

const UserPost = () => {
  const { posts, getPost, loading, deletePost } = userPostStore();
  const { user, getCurrentUser } = useAuthStore();

  useEffect(() => {
    const fetchPostandUser = async () => {
      await Promise.all([getPost(), getCurrentUser()]);
    };
    fetchPostandUser();
  }, [getPost, getCurrentUser]);

  if (loading) {
    return (
      <div className="h-screen w-full justify-center items-center text-white flex ">
        <h1>Loading...</h1>
      </div>
    );
  }


  return (
    <div className="min-h-[calc(100vh-4rem)] text-white gradient-bg w-full flex  items-center flex-col justify-center">
      <div>
        <h1 className="font-semibold my-2 py-1 text-sm bg-blue-600 px-4 rounded-[2px] w-full text-center">
          Posts
        </h1>
        {posts &&
          posts.map((post) => (
            <Post
              post={post}
              key={post._id}
              deletePost={deletePost}
              user={user}
              getPost={getPost}
              loading={loading}
            />
          ))}
      </div>
    </div>
  );
};

export default UserPost;
