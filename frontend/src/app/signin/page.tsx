"use client";

import { useUserManagementStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const { signInUser } = useUserManagementStore();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim()) {
      try {
        if (username !== "") {
          await signInUser(username).then(() => {
            router.push("/");
          });
        }
      } catch (error) {
        console.error("Failed to sign in:", error);
      }
    } else {
      console.warn("Please enter a username before signing in");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-green-900">
      {/* Right Section - Image and Caption (on top for mobile) */}
      <div
        className="order-1 md:order-2 flex flex-col justify-center items-center bg-green-800 
                   p-10 md:w-1/2 rounded-b-[50px] md:rounded-l-[50px] md:rounded-none 
                   h-1/3 md:h-auto"
      >
        <div className="text-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Board illustration"
            className="mb-4"
          />
          <p className="text-white italic text-lg">a Board</p>
        </div>
      </div>

      {/* Left Section - Sign-in Form (below on mobile) */}
      <div className="order-2 md:order-1 flex flex-col justify-center items-center p-10 bg-green-900 md:w-1/2 md:pt-5">
        <h1 className="text-4xl font-bold mb-6 text-white">Sign in</h1>
        <form onSubmit={handleSignIn} className="w-3/4 max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
