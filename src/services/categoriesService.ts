import axios from 'axios';

const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;

export async function fetchUserCategories(userId: string) {
  const url = `${baseUrl}/users/${userId}/categories`;
  return await axios.get(url);
}

export async function createCategory(category: CreateCategory) {
  const url = `${baseUrl}/categories`;
  console.log("category to create", category)
  return await axios.post(url, category);
}

export async function updateCategory(category: Category) {
  const url = `${baseUrl}/categories`;
  console.log("category to update", category)
  return await axios.put(url, category);
}

export async function deleteCategory(categoryId: string) {
  const url = `${baseUrl}/categories/${categoryId}`;
  return await axios.delete(url);
}

