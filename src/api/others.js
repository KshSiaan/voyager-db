import axios from "axios";
import { URL } from "./base";

export async function fetchTransaction(token) {
  try {
    const response = await axios.get(`${URL}/get-transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
