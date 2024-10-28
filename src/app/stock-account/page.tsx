"use client";
import ImageModal from "@/components/ImageModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuthStore from "@/store/authStore";
import { useMlStore } from "@/store/mlAccountStore";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const StockAccountPage = () => {
  const { user } = useAuthStore();
  const { posts, getPosts, deletePost } = useMlStore();
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  // Add state to track which post is being deleted
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts();
    };
    fetchPosts();
  }, []);

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
  };

  // Modified to handle opening delete dialog
  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  // Modified delete handler
  const handleDelete = async () => {
    if (postToDelete) {
      await deletePost(postToDelete);
      await getPosts();
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="min-h-screen w-full text-white flex justify-center py-2 ">
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] flex flex-col gap-4">
        <h1 className="font-semibold py-1 text-sm bg-blue-600 px-4 rounded-[2px] text-center">
          Stock Accounts
        </h1>
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col gap-6 justify-center bg-gray-900 border-b border-[#fafafa45] py-4 px-1"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="text-xs font-semibold">
                  Posted on {new Date().toLocaleDateString()}
                </p>
                <p>{post.description}</p>
              </div>
              <div className="flex flex-col items-center">
                {user && user?.role === "admin" && (
                  <MdDelete
                    className="text-white ml-8 text-xl cursor-pointer"
                    // Modified click handler to pass post._id
                    onClick={() => handleDeleteClick(post._id)}
                  />
                )}
                <p className=" text-xm font-bold px-4 py-1 rounded-xl cursor-pointer text-green-500">
                  &#8377; {post.price}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap rounded-lg overflow-hidden justify-center gap-1">
              {post.images.length === 1 ? (
                <img
                  src={post.images[0]}
                  alt="stock account"
                  className="w-full object-cover"
                  onClick={() => handleImageClick(post.images, 0)}
                />
              ) : post.images.length === 2 ? (
                post.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt="stock account"
                    className="w-[49%] min-h-[15rem] object-cover"
                    onClick={() => handleImageClick(post.images, idx)}
                  />
                ))
              ) : post.images.length === 3 ? (
                <>
                  {post.images.slice(0, 2).map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt="stock account"
                      className="w-[49%] min-h-[15rem] object-cover"
                      onClick={() => handleImageClick(post.images, idx)}
                    />
                  ))}
                  <img
                    src={post.images[2]}
                    alt="stock account"
                    className="w-full min-h-[15rem] object-cover mt-1"
                    onClick={() => handleImageClick(post.images, 2)}
                  />
                </>
              ) : (
                post.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt="stock account"
                    className="w-[49%] min-h-[15rem] object-cover"
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="text-white">
          <DialogTitle>Delete Stock-account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this ? This action cannot be undone.
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
            <Button
              variant="outline"
              // Modified to use handleDelete without parameters
              onClick={handleDelete}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StockAccountPage;
