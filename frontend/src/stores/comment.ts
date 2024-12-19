import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import commentRepo from "@/services/repositories/comment";

// Define the state interface
export interface CommentState {
  createComment: (
    postId: string,
    userId: string,
    message: string
  ) => Promise<void>;
}

export const useCommentStore = create<CommentState>()(
  devtools(
    persist(
      (set) => ({
        comments: [],

        createComment: async (
          postId: string,
          userId: string,
          message: string
        ) => {
          try {
            const result = await commentRepo().createComment(
              postId,
              userId,
              message
            );
          } catch (error) {
            console.error("Failed to create comment:", error);
          }
        },
      }),
      {
        name: "comment-storage",
      }
    )
  )
);
