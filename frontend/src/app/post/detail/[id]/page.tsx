"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { usePostManagementStore } from "@/stores/post";
import { formatDistanceToNow } from "date-fns"; // Import from date-fns
import { useCommentStore } from "@/stores/comment";

export default function DetailPage() {
  const router = useRouter();
  const { id } = useParams(); // Get the post ID from the URL

  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const { fetchSinglePost, singlePost } = usePostManagementStore();
  const { createComment } = useCommentStore();

  // Check if user is logged in
  useEffect(() => {
    const sessionData = sessionStorage.getItem("userManagement-storage");
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      const user = parsedData?.state?.user || null;
      setIsSignIn(!!user); // Set the sign-in state based on user existence
      setUserId(user?.id || null);
    }
  }, []);

  // Fetch the post by ID
  useEffect(() => {
    if (id) {
      fetchSinglePost(id as string);
    }
  }, [id, fetchSinglePost]);

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) {
      alert("Please write a comment before posting.");
      return;
    }

    await createComment(id as string, userId, commentInput.trim());
    await fetchSinglePost(id as string);
    setCommentInput("");
  };

  if (!singlePost) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-6">
      {/* Back Button */}
      <button
        className="flex items-center text-gray-500 hover:text-gray-700"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      {/* Post and Comments Section */}
      <div className="bg-white p-6 rounded-lg">
        {/* Post Details */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://via.placeholder.com/48"
              alt="Author avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{singlePost.owner.username}</h3>
              <p className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(singlePost.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <span className="inline-block bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full mb-4">
            {singlePost.community.name}
          </span>
          <h1 className="text-2xl font-bold mb-4">{singlePost.title}</h1>
          <p className="text-gray-700">{singlePost.description}</p>
        </div>

        <div className="flex items-center text-gray-500 text-sm mt-4 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.36 1.5 1.18 1.5 2.14v6.774c0 1.344-1.579 2.01-2.646 1.174L15.75 16.5l-3.75 3-3.75-3-3.354 2.824c-1.067.836-2.646.17-2.646-1.174V10.65c0-.96.616-1.78 1.5-2.14l8.25-3.364a1.724 1.724 0 0 1 1.5 0l8.25 3.364z"
            />
          </svg>
          <span>{singlePost.comments.length} Comments</span>
        </div>

        {/* Comment Input */}
        {isSignIn ? (
          <div className="mb-6">
            <textarea
              placeholder="What's on your mind..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
            ></textarea>
            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={() => setCommentInput("")}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCommentSubmit}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Post
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-20"></div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {singlePost.comments?.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src="https://via.placeholder.com/40"
                alt="Comment author avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{comment.commentedBy}</h4>
                  <p className="text-gray-500 text-sm">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="text-gray-700">{comment.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
