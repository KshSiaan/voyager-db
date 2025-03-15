import axios from "axios";
import { URL } from "./base";

export async function fetchDashboard(admin_token, filter, chartType) {
  try {
    const token = admin_token;

    const response = await axios.get(
      `${URL}/admin-dashboard?filter=weekly&chart_type=revenue`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    throw new Error("Failed to fetch dashboard data. Please try again later.");
  }
}
