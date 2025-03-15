import axios from "axios";
import { URL } from "./base";

export async function postAttraction(token, formData) {
  const UpdatedData = {
    ...formData, // Spread formData to copy all its properties
    images: [], // Override only the 'images' field to be an empty array
  };
  try {
    const call = await axios.post(`${URL}/attraction`, UpdatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Listing: ");
    console.log(call);

    return call;
  } catch (error) {
    console.error(error);
  }
}
