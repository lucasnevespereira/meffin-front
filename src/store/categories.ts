import { defineStore } from "pinia";
import {
  fetchUserCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../services/categoriesService";
import { AxiosError } from "axios";

export const useCategoriesStore = defineStore({
  id: 'categories',

  state: () => ({
    categories: [] as Category[],
    isFetching: false,
    error: null as string | null,
  }),

  actions: {
    async addCategory(category: CreateCategory) {
      this.isFetching = true
      console.log("adding category")
      try {
        const response = await createCategory(category);
        if (response && response.data) {
          console.log("before store categories", this.categories)
          this.categories.push(response.data);
          console.log("after store categories", this.categories)
        }
      } catch (error) {
        this.error = "Failed to add category.";
        console.error(error);
      } finally {
        this.isFetching = false
      }
    },
    async updateCategory(updatedCategory: Category) {
      this.isFetching = true;
      try {
        const response = await updateCategory(updatedCategory);
        if (response && response.data) {
          const index = this.categories.findIndex(t => t.id === updatedCategory.id);
          if (index !== -1) {
            this.categories[index] = response.data;
          }
        }
      } catch (error) {
        this.error = "Failed to update category.";
        console.error(error);
      } finally {
        this.isFetching = false;
      }
    },
    async removeCategory(categoryId: string) {
      this.isFetching = true
      try {
        console.log("deleting category")
        await deleteCategory(categoryId);

        // Remove category from the state
        this.categories = this.categories.filter(c => c.id !== categoryId);
      } catch (error) {
        this.error = "Failed to remove category.";
        console.error(this.error);
      } finally {
        this.isFetching = false
      }
    },
    async fetchCategories(userId: string) {
      this.isFetching = true;
      this.error = null;
      try {
        const response = await fetchUserCategories(userId);
        if (response && response.data) {
          this.categories = response.data;
        }
      } catch (e: AxiosError | any) {
        this.error = "Failed to fetch categories.";
        if (e.response && e.response.data) {
          this.error = e.response.data.message;
        }
        console.log("status", e.response.status)
        if (e.response.status != 404) {
          console.error(this.error);
        }
      } finally {
        this.isFetching = false;
      }
    },
  },
});
