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
    search: string;
    community: string;
  }) => Promise<void>;
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
    }),
    {
      name: "postManagement-storage",
    }
  )
);
