import { create } from "zustand";
import { devtools } from "zustand/middleware";
import postRepo from "@/services/repositories/post";
import { PostManagement } from "@/services/models/post";

// Define the state interface
export interface PostManagementState {
  postList: PostManagement[];
  singlePost: PostManagement | null;
  search: string; // Global search state
  setSearch: (search: string) => void; // Method to update search state
  fetchPostList: (query: {
    search?: string;
    community?: string;
    userId?: string;
  }) => Promise<void>;
  fetchSinglePost: (postId: string) => Promise<void>;
  createPost: (data: {
    title: string;
    description: string;
    communityId: number;
    userId: string;
  }) => Promise<void>; // Action to create a post
  editPost: (
    postId: string,
    userId: string,
    data: Partial<{ title: string; description: string; communityId: number }>
  ) => Promise<void>;
  deletePost: (postId: string, userId: string) => Promise<void>;
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

      fetchSinglePost: async (postId) => {
        try {
          const result = await postRepo().fetchSinglePost(postId); // Call the API method
          set({ singlePost: result.data || null }); // Update the single post in the store
        } catch (error) {
          console.error(
            `Failed to fetch single post with ID ${postId}:`,
            error
          );
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
        } catch (error) {
          console.error("Failed to create post:", error);
        }
      },
      editPost: async (
        postId,
        userId,
        data: Partial<{
          title: string;
          description: string;
          communityId: number;
        }>
      ) => {
        try {
          const result = await postRepo().editPost(postId, userId, data); // Call the API method
          // Optionally, fetch the single post and the post list again to update the store
          await get().fetchSinglePost(postId);
          await get().fetchPostList({ search: get().search });
        } catch (error) {
          console.error(`Failed to edit post with ID ${postId}:`, error);
        }
      },
      deletePost: async (postId, userId) => {
        try {
          await postRepo().deletePost(postId, userId); // Call the API method to delete the post
          // Optionally, fetch the post list again to update the store
          await get().fetchPostList({ search: get().search });
        } catch (error) {
          console.error(`Failed to delete post with ID ${postId}:`, error);
        }
      },
    }),
    {
      name: "postManagement-storage",
    }
  )
);
