"use client"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { userPostStore } from "@/store/postStore";
import React, { useEffect, useState } from "react";

const UserPost = () => {
  const { posts, getPost } = userPostStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    getPost();
  }, [userPostStore]);
  console.log(posts);
  
  if(!isLoaded) {
    return <div className="h-screen w-full justify-center items-center">
      <h1>Loading...</h1>
    </div>
  }

  return (
    <div className="min-h[(100vh-4rem)] text-white">
      {/* <h1>user Post</h1> */}
      {posts.map((post) => (
        <Card key={post._id} className="max-w-fit">
          <CardTitle>{post.title}</CardTitle>
          <CardContent>
            <img src={post.image} alt={post.title} />
          </CardContent>
          <CardDescription>{post.description}</CardDescription>
        </Card>
      ))}
    </div>
  );
};

export default UserPost;
