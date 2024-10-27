"use client";
import Post from "@/components/Post";
import useAuthStore from "@/store/authStore";
import { userPostStore } from "@/store/postStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { MdAdminPanelSettings, MdVerified } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";

const ProfilePage = () => {
  const { specificUser, getUserById, loading, user } = useAuthStore();
  const { posts, getPostByUserId, deletePost } = userPostStore();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        await getUserById(id as string);
        await getPostByUserId(id as string);
      }
    };

    fetchUser();
  }, [id, getUserById]);
  console.log("Specific User", specificUser);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center text-white flex-col items-center">
      <div className="flex items-center flex-col justify-center p-4">
        <img
          src={specificUser?.profilePicture}
          alt=""
          className="w-28 h-28 rounded-full"
        />
        <div className="flex items-center gap-1">
          <h1 className="text-2xl font-semibold">{specificUser?.username}</h1>
          <MdVerified
            className={`text-blue-600 text-2xl ${
              specificUser?.role !== "admin" ? "hidden" : ""
            } `}
          />
        </div>
        {specificUser?.role === "admin" && user?.id as string === specificUser.id &&(
          <Link href={"/admin-panel"} className="flex gap-2 items-center bg-blue-600 px-3 py-1 mt-2 transition-all hover:bg-blue-700">
            <p>Go to admin panel</p>
            <MdAdminPanelSettings className="text-2xl"/>
          </Link>
        )}
      </div>
      <div className="w-full max-w-[30rem] flex justify-center flex-col items-center">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            deletePost={deletePost}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
