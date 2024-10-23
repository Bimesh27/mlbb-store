"use client";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

const Sidebar = () => {
  const { user, getCurrentUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser();
    };
    fetchUser();
  }, [getCurrentUser]);
  console.log(user);
  
  return (
    <div className="border h-screen fixed w-80 left-0">
      {user ? (
        <>
          <img src={user.profilePicture} alt={user.username} />
          <h1>{user.username}</h1>
          <p>{user.email}</p>
          <p>{user.id}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Sidebar;
