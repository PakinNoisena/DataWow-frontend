"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "./dropdown";

interface CreatePostCardProps {
  onCancel: () => void;
  onPost: (data: { community: string; title: string; content: string }) => void;
  communities: { id: string; name: string }[];
  isCreate: boolean; // Determines if the card is for creating or editing
  defaultCommunity: string; // Default selected community
  defaultTitle: string; // Default title for editing
  defaultDescription: string; // Default description for editing
}

export default function CreatePostCard({
  onCancel,
  onPost,
  communities,
  isCreate,
  defaultCommunity,
  defaultTitle,
  defaultDescription,
}: CreatePostCardProps) {
  const [selectedCommunity, setSelectedCommunity] =
    useState<string>(defaultCommunity);
  const [title, setTitle] = useState<string>(defaultTitle || "");
  const [content, setContent] = useState<string>(defaultDescription || "");

  useEffect(() => {
    setSelectedCommunity(defaultCommunity);
  }, [defaultCommunity]);

  const handlePost = () => {
    if (selectedCommunity === "" || !title.trim() || !content.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    onPost({ community: selectedCommunity, title, content });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">
          {isCreate ? "Create Post" : "Edit Post"}
        </h2>

        {/* Community Selector */}
        <div className="mb-4 flex gap-4">
          {/* Smaller Dropdown */}
          <div className="w-1/3">
            <Dropdown
              items={communities}
              onSelect={(value) => setSelectedCommunity(value)}
              defaultSelected={String(selectedCommunity)}
              bgColor="bg-blue-700"
              borderColor="border-blue-500"
              textColor="text-white"
              hoverBgColor="hover:bg-blue-800"
            />
          </div>
          <div className="w-3/4"></div>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <input
            id="title"
            type="text"
            placeholder={defaultTitle === "" ? "Title" : ""}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Content Text Area */}
        <div className="mb-6">
          <textarea
            id="content"
            placeholder={
              defaultDescription === "" ? "What's on your mind..." : ""
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={5}
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            {isCreate ? "Post" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
