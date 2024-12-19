import { create } from "zustand";
import { devtools } from "zustand/middleware";
import communityRepo from "@/services/repositories/community";
import { CommunityManagement } from "@/services/models/community";

// Define the state interface
export interface CommunityManagementState {
  communityManagementList: CommunityManagement[];
  fetchCommunityManagementList: () => Promise<void>;
}

export const useCommunityManagementStore = create<CommunityManagementState>()(
  devtools(
    (set) => ({
      communityManagementList: [],

      fetchCommunityManagementList: async () => {
        try {
          const results = await communityRepo().fetchCommunityList();
          set({ communityManagementList: results.data || [] });
        } catch (error) {
          console.error("Failed to fetch community list:", error);
        }
      },
    }),
    {
      name: "communityManagement-storage",
    }
  )
);
