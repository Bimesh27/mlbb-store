import { Link } from "lucide-react";
import React from "react";

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
}

const Post = ({ post }: PostProps) => {
  return (
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
      <img src={post.image} className=" w-96 sm:w-[30rem] h-auto" />
    </div>
  );
};

export default Post;
