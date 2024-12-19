"use client";

import React, { useEffect, useState } from "react";
import SearchForm from "../components/searchForm";
import NavBar from "../components/navbar";
import Dropdown from "@/components/dropdown";
import Button from "../components/button";
import ProductCard from "../components/productCard";
import { useCommunityManagementStore } from "@/stores/community";
import { CommunityManagement } from "@/services/models/community";
import { PostManagement } from "@/services/models/post";
import { usePostManagementStore } from "@/stores/post";

export default function Home() {
  const userSignedIn = false;

  const [localCommunityList, setLocalCommunityList] = useState<
    CommunityManagement[]
  >([]);
  const [localPostList, setLocalPostList] = useState<PostManagement[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");

  const { fetchCommunityManagementList, communityManagementList } =
    useCommunityManagementStore();

  const { fetchPostList, postList } = usePostManagementStore();

  const [selectedOption, setSelectedOption] = useState<string>("all");

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

  // Sync Zustand store data with local state
  useEffect(() => {
    setLocalCommunityList(communityManagementList);
  }, [communityManagementList]);

  // Fetch post data when debounced search text or selected option changes
  useEffect(() => {
    const fetchPostData = async () => {
      await fetchPostList({
        search: debouncedSearchText,
        community: selectedOption === "all" ? "" : selectedOption, // Use "" for 'all'
      });
    };

    fetchPostData();
  }, [debouncedSearchText, selectedOption, fetchPostList]);

  // Sync Zustand store post data with local state
  useEffect(() => {
    setLocalPostList(postList);
  }, [postList]);

  const handleSearch = (query: string) => {
    setSearchText(query);
  };

  const handleDropdownSelect = (value: string) => {
    console.log("Selected dropdown option:", value);
    setSelectedOption(value); // Update selectedOption with the selected community's id
  };

  return (
    <div>
      <NavBar signIn={userSignedIn} />
      <div className="p-4 flex justify-center">
        {/* Container for Search, Dropdown, and Button */}
        <div className="flex items-center gap-2">
          {/* Search Form */}
          <div>
            <SearchForm defaultValue="" onSearch={handleSearch} />
          </div>

          {/* Dropdown */}
          <div>
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
              bgColor="bg-blue-700"
              borderColor="border-blue-500"
              textColor="text-white"
              hoverBgColor="hover:bg-blue-800"
            />
          </div>

          {/* Button */}
          <div>
            <Button
              text="Create +"
              className="bg-green-500 text-white hover:bg-green-700"
              onClick={() => alert("Create button clicked!")}
            />
          </div>
        </div>
      </div>
      {/* Cards Section */}
      <div className="mt-6 flex flex-col items-center space-y-4">
        {localPostList.map((post, index) => (
          <div key={index} className="w-full max-w-2xl">
            <ProductCard
              author={post.owner.username}
              category={post.community.name}
              title={post.title}
              description={post.description}
              commentsCount={post.comments?.length || 0}
              avatarUrl={"https://via.placeholder.com/48"}
              onClick={() => console.log(`Post clicked: ${post.title}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
