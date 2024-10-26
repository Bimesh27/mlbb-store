"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

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
  getPost?: () => void;
  loading?: boolean;
}

const Post = ({ post, deletePost, user, getPost, loading }: PostProps) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost?.(post._id);
      getPost?.(); // Refresh posts
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setDeleteDialogOpen(false);
      setIsDeleting(false);
    }
  };

  if (loading || isDeleting) {
    return (
      <div className="h-screen w-full justify-center items-center text-white flex">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div
      key={post._id}
      className="w-fit p-4 gap-2 flex flex-col bg-[#131313] h-fit border-b border-[#dafafa5b]"
    >
      <div>
        <div className="flex gap-2 items-center justify-between">
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
          {post?.createdBy?._id === user?.id && (
            <div className="relative w-fit">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <HiDotsHorizontal className="text-white text-2xl cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute right-6 flex flex-col gap-2 cursor-pointer">
                  <DropdownMenuItem className="hover:scale-105 flex gap-2 items-center">
                    <span>Edit</span>
                    <CiEdit className="text-white" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:scale-105 flex gap-2 items-center"
                    onSelect={() => setDeleteDialogOpen(true)}
                  >
                    <span>Delete</span>
                    <MdDelete className="text-white" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
      <h1>{post.description}</h1>
      <img src={post.image} className="w-96 sm:w-[30rem] h-auto" />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="text-white">
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter className="flex flex-col gap-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button variant="outline" onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
