"use client";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import { FaFantasyFlightGames } from "react-icons/fa";

const Sidebar = () => {
  const { user, getCurrentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
      } catch (err: any) {
        setError("Failed to load user data."); // Set error if fetching fails
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [getCurrentUser]);

  console.log(user);

  return (
    <div className="border border-[#dadada18] h-screen fixed w-80 left-0 flex items-center flex-col gap-8 p-4 text-white z-50">
      {/* <div>
        <FaFantasyFlightGames className="text-5xl" />
      </div> */}
      {isLoading ? (
        <span>Loading user data...</span>
      ) : error ? (
        <span>{error}</span>
      ) : user ? (
        <div className="flex flex-col items-center">
          <div className="rounded-full overflow-hidden max-w-fit">
            <img
              src={user.profilePicture} 
              alt={user.username}
              className="w-28"
            />
          </div>
          <h2 className="font-bold text-2xl">{user.username}</h2>
          <span>{user.email}</span>
        </div>
      ) : (
        <span>No user data available.</span>
      )}
    </div>
  );
};

export default Sidebar;
