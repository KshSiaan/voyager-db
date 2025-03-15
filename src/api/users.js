import axios from "axios";
import { URL } from "./base";

export async function fetchUsers(admin_token) {
  try {
    const token = admin_token;

    const response = await axios.get(`${URL}/users?per_page&page&search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export async function resetUserPass(admin_token, formData, id) {
  try {
    const token = admin_token;

    const response = await axios.put(
      `${URL}/reset-password?id=${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export async function suspendUserRequest(admin_token, id) {
  try {
    const response = await axios.patch(
      `${URL}/suspended-user?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${admin_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error suspending user:", error.message);
    throw new Error("Failed to suspend user. Please try again later.");
  }
}

export async function deleteUserRequest(admin_token, id) {
  try {
    const response = await axios.patch(
      `${URL}/delete-user?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${admin_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error suspending user:", error.message);
    throw new Error("Failed to suspend user. Please try again later.");
  }
}
