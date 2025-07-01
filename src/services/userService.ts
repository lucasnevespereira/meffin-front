import { Currency } from "@/enum";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_API_BASE_URL as string;

export interface CreateUser {
  auth0Id: string;
  email: string;
  name: string;
  nickname?: string;
  picture?: string;
  currency?: Currency;
}

export interface User {
  id: string;
  auth0Id: string;
  email: string;
  name: string;
  nickname?: string;
  picture?: string;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
}

export async function createUser(userData: CreateUser): Promise<User> {
  const url = `${baseUrl}/user-management`;
  const response = await axios.post(url, userData);
  return response.data;
}

export async function getUserByAuth0Id(auth0Id: string): Promise<User> {
  const url = `${baseUrl}/user-management/auth0/${auth0Id}`;
  const response = await axios.get(url);
  return response.data;
}

export async function updateUser(
  userId: string,
  userData: Partial<CreateUser>,
): Promise<User> {
  const url = `${baseUrl}/user-management/${userId}`;
  const response = await axios.put(url, userData);
  return response.data;
}

export async function updateUserCurrency(
  userId: string,
  currency: Currency,
): Promise<User> {
  const url = `${baseUrl}/user-management/${userId}/currency`;
  const response = await axios.patch(url, { currency });
  return response.data;
}

export async function deleteUser(userId: string): Promise<void> {
  const url = `${baseUrl}/user-management/${userId}`;
  await axios.delete(url);
}

// Sync function that sends Auth0 user data to backend
export async function syncUserWithDatabase(auth0User: any): Promise<User> {
  const url = `${baseUrl}/user-management/sync`;
  const response = await axios.post(url, auth0User);
  return response.data;
}
