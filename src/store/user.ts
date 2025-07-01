import { defineStore } from "pinia";
import {
  syncUserWithDatabase,
  updateUserCurrency,
} from "../services/userService";
import type { User } from "../services/userService";
import { Currency } from "@/enum";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    currentUser: null as User | null,
    currency: Currency.EUR as Currency, // Add currency field
    isSyncing: false,
    isUpdatingCurrency: false,
    error: null as string | null,
  }),

  actions: {
    async syncUser(auth0User: any) {
      this.isSyncing = true;
      this.error = null;

      try {
        console.log("Syncing user with Auth0 ID:", auth0User.sub);
        const user = await syncUserWithDatabase(auth0User);
        this.currentUser = user;
        this.currency = user.currency; // Set currency from synced user
        console.log("User synced successfully:", user);
        return user;
      } catch (error: any) {
        this.error = "Failed to sync user with database.";
        console.error("Sync error:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
        throw error;
      } finally {
        this.isSyncing = false;
      }
    },

    clearUser() {
      this.currentUser = null;
      this.currency = Currency.EUR; // Reset to default
      this.error = null;
    },

    // Add a method to get the current user
    getCurrentUser(): User | null {
      return this.currentUser;
    },

    // Add a method to check if user is synced
    isUserSynced(): boolean {
      return this.currentUser !== null;
    },

    // Add a method to update user in store
    updateUser(user: User) {
      this.currentUser = user;
      this.currency = user.currency; // Update currency when user is updated
    },

    // New method to update currency immediately
    async updateCurrency(newCurrency: Currency) {
      if (!this.currentUser?.id) {
        throw new Error("No user found");
      }

      // Update immediately in store for instant UI feedback
      this.currency = newCurrency;
      this.isUpdatingCurrency = true;

      try {
        // Update in backend
        const updatedUser = await updateUserCurrency(
          this.currentUser.id,
          newCurrency,
        );

        // Update the full user object in store
        this.currentUser = updatedUser;

        console.log("Currency updated successfully");
        return updatedUser;
      } catch (error) {
        // Revert the currency change if API call fails
        this.currency = this.currentUser.currency;
        console.error("Failed to update currency:", error);
        throw error;
      } finally {
        this.isUpdatingCurrency = false;
      }
    },

    // Getter for currency
    getCurrency(): Currency {
      return this.currency;
    },

    // Getter for updating state
    getIsUpdatingCurrency(): boolean {
      return this.isUpdatingCurrency;
    },
  },
});
