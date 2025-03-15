import axios from "axios";
import { URL } from "./base";

export async function fetchProfile(token) {
  try {
    const response = await axios.get(`${URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export async function postProfile(token, data) {
  try {
    const response = await axios.post(
      `${URL}/profile-update?_method=PUT`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}
