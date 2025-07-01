import axios from "axios";

const authDomain: string = import.meta.env.VITE_AUTH0_DOMAIN as string;
const authToken: string = import.meta.env.VITE_AUTH_MANAGEMENT_TOKEN as string;

export async function deleteUser(userId: string) {
  return await axios.delete(`https://${authDomain}/api/v2/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
