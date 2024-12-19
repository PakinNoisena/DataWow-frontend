"use client";

import React, { useEffect, useState } from "react";
import { useCommunityManagementStore } from "@/stores/community";
import { CommunityManagement } from "@/services/models/community";
import { PostManagement } from "@/services/models/post";
import { usePostManagementStore } from "@/stores/post";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar";
import SearchForm from "@/components/searchForm";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import ProductCard from "@/components/productCard";
import ConfirmModal from "@/components/confirmModal";

export default function OurBlog() {
  const router = useRouter();

  const [localCommunityList, setLocalCommunityList] = useState<
    CommunityManagement[]
  >([]);
  const [localPostList, setLocalPostList] = useState<PostManagement[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const { fetchCommunityManagementList, communityManagementList } =
    useCommunityManagementStore();
  const { fetchPostList, postList, deletePost } = usePostManagementStore();

  const [selectedOption, setSelectedOption] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Retrieve user from sessionStorage and set sign-in state
  useEffect(() => {
    const sessionData = sessionStorage.getItem("userManagement-storage");
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      const user = parsedData?.state?.user || null;
      setIsSignIn(!!user); // Set sign-in state based on stored user
      setUserId(user?.id || null);
    }
    setIsLoading(false);
  }, []);

  // Redirect to home if no userId after loading is complete
  useEffect(() => {
    if (!isLoading && !userId) {
      router.push("/");
    }
  }, [isLoading, userId, router]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  // Fetch community data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchCommunityManagementList();
    };
    fetchData();
  }, [fetchCommunityManagementList]);

  // Sync Zustand store data with local state for communities
  useEffect(() => {
    setLocalCommunityList(communityManagementList);
  }, [communityManagementList]);

  // Fetch post data when debounced search text, selected option, or userId changes
  useEffect(() => {
    const fetchPostData = async () => {
      if (!userId) return; // Ensure userId exists before fetching
      await fetchPostList({
        search: debouncedSearchText,
        community: selectedOption === "all" ? "" : selectedOption,
        userId,
      });
    };
    fetchPostData();
  }, [debouncedSearchText, selectedOption, userId, fetchPostList]);

  // Sync Zustand store post data with local state for posts
  useEffect(() => {
    setLocalPostList(postList);
  }, [postList]);

  const handleSearch = (query: string) => {
    setSearchText(query);
  };

  const handleDropdownSelect = (value: string) => {
    setSelectedOption(value); // Update selectedOption with the selected community's id
  };

  const handleCreateBtn = () => {
    router.push("/post/create");
  };

  const handleEdit = (postId: string) => {
    // Navigate to edit page
    router.push(`/post/edit/${postId}`);
  };

  const handleDelete = (postId: string) => {
    setPostToDelete(postId); // Set the post ID to be deleted
    setIsModalOpen(true); // Open the modal
  };

  const confirmDelete = async () => {
    if (postToDelete && userId) {
      await deletePost(postToDelete, userId);
      setIsModalOpen(false);
      setPostToDelete(null); // Reset the state
      await fetchPostList({
        search: debouncedSearchText,
        community: selectedOption === "all" ? "" : selectedOption,
        userId,
      });
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPostToDelete(null); // Reset the state
  };

  // Show a loading indicator while verifying the session
  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div>
      {/* Navbar with dynamic sign-in state */}
      <NavBar signIn={isSignIn} />

      {/* Search, Dropdown, and Button */}
      <div className="p-4 flex justify-center mt-20">
        <div className="flex items-center gap-2">
          {/* Search Form */}
          <SearchForm defaultValue="" onSearch={handleSearch} />

          {/* Dropdown */}
          <Dropdown
            items={[
              { id: "all", name: "All Community" },
              ...localCommunityList.map((community) => ({
                name: community.name,
                id: community.id.toString(),
              })),
            ]}
            onSelect={handleDropdownSelect}
            defaultSelected="all"
            bgColor="bg-white"
          />

          {/* Create Button */}
          {isSignIn && (
            <Button
              text="Create +"
              className="bg-green-500 text-white hover:bg-green-700"
              onClick={handleCreateBtn}
            />
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-6 flex flex-col items-center space-y-4">
        {localPostList.map((post) => (
          <div key={post.id} className="w-full max-w-2xl">
            <ProductCard
              author={post.owner.username}
              category={post.community.name}
              title={post.title}
              description={post.description}
              commentsCount={post.comments?.length || 0}
              avatarUrl={"https://via.placeholder.com/48"}
              userId={userId!} // Current logged-in user ID
              onEdit={() => handleEdit(post.id)}
              onDelete={() => handleDelete(post.id)}
              onClick={() => router.push(`/post/detail/${post.id}`)}
            />
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <ConfirmModal
          title="Please confirm if you wish to delete the post"
          description="Are you sure you want to delete the post? Once deleted, it cannot be recovered."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
