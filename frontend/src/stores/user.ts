import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import userRepo from "@/services/repositories/user";
import { UserManagement } from "@/services/models/user";

// Define the state interface
export interface UserManagementState {
  user: UserManagement | null;
  signInUser: (username: string) => Promise<void>;
}

const sessionStorageWrapper = {
  getItem: (key: string) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
};

export const useUserManagementStore = create<UserManagementState>()(
  devtools(
    persist(
      (set) => ({
        user: null,

        signInUser: async (username: string) => {
          try {
            const result = await userRepo().signIn(username);

            set({ user: result.data || null });
          } catch (error) {
            console.error("Failed to sign in user:", error);
          }
        },
      }),
      {
        name: "userManagement-storage",
        storage: sessionStorageWrapper,
      }
    )
  )
);
