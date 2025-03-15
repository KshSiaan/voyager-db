import axios from "axios";
import { URL } from "./base";

export async function login(formData) {
  const call = await axios.post(`${URL}/login`, formData);
  return call;
}

export async function fetchFaq(admin_token) {
  try {
    const token = admin_token; // Store this securely!

    const response = await axios.get(`${URL}/get-faq`, {
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

export async function postFaq(admin_token, formData) {
  try {
    const token = admin_token; // Store this securely!

    const response = await axios.post(`${URL}/faq`, formData, {
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

export async function fetchTnc(token) {
  try {
    const response = await axios.get(`${URL}/get-term_condition`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export async function postTnc(token, formData) {
  try {
    const response = await axios.post(`${URL}/term-condition`, formData, {
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
