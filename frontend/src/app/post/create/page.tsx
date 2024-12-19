"use client";
import CreatePostCard from "@/components/formCard";
import { CommunityManagement } from "@/services/models/community";
import { useCommunityManagementStore } from "@/stores/community";
import { usePostManagementStore } from "@/stores/post";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreatePost() {
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [localCommunityList, setLocalCommunityList] = useState<
    CommunityManagement[]
  >([]);

  const { fetchCommunityManagementList, communityManagementList } =
    useCommunityManagementStore();

  const { createPost } = usePostManagementStore();

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
    };
    fetchData();
  }, [fetchCommunityManagementList]);

  useEffect(() => {
    setLocalCommunityList(communityManagementList);
  }, [communityManagementList]);

  const handleCancel = () => {
    router.push("/");
  };

  const handlePost = async (data: {
    community: string;
    title: string;
    content: string;
  }) => {
    if (userId) {
      await createPost({
        title: data.title,
        description: data.content,
        communityId: parseInt(data.community, 10),
        userId,
      });
      router.push("/");
    }
  };

  if (!isSignIn) {
    return null;
  }

  return (
    <div>
      <CreatePostCard
        onCancel={handleCancel}
        onPost={handlePost}
        communities={[
          ...localCommunityList.map((community) => ({
            name: community.name,
            id: community.id.toString(),
          })),
        ]}
        isCreate={true}
        defaultCommunity="0"
        defaultTitle=""
        defaultDescription=""
      />
    </div>
  );
}
