import axios from "axios";
import { URL } from "./base";

export async function fetchBucket(token) {
  try {
    const response = await axios.get(`${URL}/get-bucketlist`, {
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

export async function postBucket(token, data) {
  try {
    const response = await axios.post(`${URL}/bucketlist`, data, {
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

export async function fetchBanner(token) {
  try {
    const response = await axios.get(`${URL}/get-shopbanner`, {
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

export async function postBanner(token, data) {
  try {
    const response = await axios.post(`${URL}/shopbanner`, data, {
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
