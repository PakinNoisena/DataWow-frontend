"use client";
import CreatePostCard from "@/components/formCard";
import { CommunityManagement } from "@/services/models/community";
import { PostManagement } from "@/services/models/post";
import { useCommunityManagementStore } from "@/stores/community";
import { usePostManagementStore } from "@/stores/post";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditPost() {
  const router = useRouter();
  const { id } = useParams(); // Get the post ID from the URL

  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [localCommunityList, setLocalCommunityList] = useState<
    CommunityManagement[]
  >([]);
  const [localSinglePost, setLocalSinglePost] = useState<PostManagement | null>(
    null
  );

  const { fetchCommunityManagementList, communityManagementList } =
    useCommunityManagementStore();

  const { fetchSinglePost, editPost, singlePost } = usePostManagementStore(); // Include editPost action

  useEffect(() => {
    const sessionData = sessionStorage.getItem("userManagement-storage");
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      const user = parsedData?.state?.user || null;
      setIsSignIn(!!user);
      setUserId(user?.id || null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isSignIn) {
      router.push("/");
    }
  }, [isSignIn, isLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCommunityManagementList();
      if (id) {
        await fetchSinglePost(id as string); // Fetch the single post by ID
      }
    };
    fetchData();
  }, [fetchCommunityManagementList, fetchSinglePost, id]);

  useEffect(() => {
    setLocalCommunityList(communityManagementList);
  }, [communityManagementList]);

  useEffect(() => {
    if (id) {
      setLocalSinglePost(null); // Reset the local state when the ID changes
      if (singlePost && singlePost.id === id) {
        setLocalSinglePost(singlePost); // Set the state only if the fetched post matches the current ID
      }
    }
  }, [id, singlePost]);

  const handleCancel = () => {
    router.push("/");
  };

  const handleEdit = async (data: {
    community: string;
    title: string;
    content: string;
  }) => {
    if (userId && id) {
      try {
        await editPost(id as string, userId, {
          title: data.title,
          description: data.content,
          communityId: parseInt(data.community, 10),
        });
        router.push("/"); // Redirect to the home page or another page after a successful edit
      } catch (error) {
        console.error("Failed to update post:", error);
      }
    }
  };

  if (!isSignIn || isLoading || !localSinglePost) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div>
      <CreatePostCard
        onCancel={handleCancel}
        onPost={handleEdit}
        communities={[
          ...localCommunityList.map((community) => ({
            name: community.name,
            id: community.id.toString(),
          })),
        ]}
        isCreate={false}
        defaultCommunity={localSinglePost.community.id} // Use local state for community ID
        defaultTitle={localSinglePost.title} // Use local state for title
        defaultDescription={localSinglePost.description} // Use local state for description
      />
    </div>
  );
}
