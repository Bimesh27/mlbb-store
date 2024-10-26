import Link from "next/link";
import React from "react";
import { MdDelete } from "react-icons/md";

interface Posts {
  _id: string;
  image: string;
  description: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    role: string;
  };
}

interface PostProps {
  post: Posts;
  deletePost?: (id: string) => void;
  user?: {
    id: string;
    email: string;
    username: string;
    role: string;
    profilePicture: string;
  } | null;
}

const Post = ({ post, deletePost, user }: PostProps) => {
  console.log("post",post);
  console.log("user",user);
  
  return (
    <div
      key={post._id}
      className=" w-fit p-4 gap-2 flex flex-col bg-[#131313] h-fit border-b border-[#dafafa5b]"
    >
      <div>
        <div className="flex gap-2 items-center justify-between ">
          <Link
            href={`profile/${post.createdBy._id}`}
             className="flex items-center gap-2"
          >
            <img
              src={post?.createdBy?.profilePicture}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <h1 className="font-semibold">{post?.createdBy?.username}</h1>
          </Link>
          {post?.createdBy?._id as string === user?.id as string && (
            <MdDelete className="text-2xl text-white z-50" />
          )}
          {/* <MdDelete/> */}
        </div>
      </div>
      <h1>{post.description}</h1>
      <img src={post.image} className=" w-96 sm:w-[30rem] h-auto" />
    </div>
  );
};

export default Post;
