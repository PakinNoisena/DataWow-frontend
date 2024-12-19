import { create } from "zustand";
import { devtools } from "zustand/middleware";
import postRepo from "@/services/repositories/post";
import { PostManagement } from "@/services/models/post";

// Define the state interface
export interface PostManagementState {
  postList: PostManagement[];
  search: string; // Global search state
  setSearch: (search: string) => void; // Method to update search state
  fetchPostList: (query: {
    search?: string;
    community?: string;
    userId?: string;
  }) => Promise<void>;
  createPost: (data: {
    title: string;
    description: string;
    communityId: number;
    userId: string;
  }) => Promise<void>; // Action to create a post
}

export const usePostManagementStore = create<PostManagementState>()(
  devtools(
    (set, get) => ({
      postList: [],
      search: "", // Initialize search state as an empty string

      setSearch: (search) => {
        set({ search }); // Update search state
      },

      fetchPostList: async (query) => {
        try {
          const results = await postRepo().fetchPostList(query); // Call the API method
          set({ postList: results.data || [] }); // Update the post list in the store
        } catch (error) {
          console.error("Failed to fetch post list:", error);
        }
      },

      createPost: async (data) => {
        try {
          const result = await postRepo().createPost(data, data.userId); // Call the API method
          // Optionally, fetch the post list again to update the store
          const query = {
            search: get().search,
            community: String(data.communityId),
          };
          await get().fetchPostList(query); // Refresh the post list
          console.log("Post created successfully:", result);
        } catch (error) {
          console.error("Failed to create post:", error);
        }
      },
    }),
    {
      name: "postManagement-storage",
    }
  )
);
