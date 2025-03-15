import axios from "axios";
import { URL } from "./base";

export async function fetchQuest(token) {
  try {
    const response = await axios.get(`${URL}/get-quest`, {
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
export async function refetchQuest(token, link) {
  try {
    const response = await axios.get(`${URL + link}`, {
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

export async function postQuest(token, data) {
  try {
    const response = await axios.post(`${URL}/quest`, data, {
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

export async function deleteQuest(token, id) {
  try {
    const response = await axios.delete(`${URL}/delete-quest?quest_id=${id}`, {
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

export async function fetchAvatar(token) {
  try {
    const response = await axios.get(`${URL}/get-avatar`, {
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

export async function postAvatar(token, data) {
  try {
    const response = await axios.post(`${URL}/avatar`, data, {
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

export async function fetchDigitals(token) {
  try {
    const response = await axios.get(`${URL}/get-digital-item`, {
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

export async function postDigitals(token, data) {
  try {
    const response = await axios.post(`${URL}/digital-item`, data, {
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

export async function fetchPowers(token) {
  try {
    const response = await axios.get(`${URL}/get-power-ups`, {
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

export async function postPowers(token, data) {
  try {
    const response = await axios.post(`${URL}/power-up`, data, {
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

export async function fetchAchivements(token) {
  try {
    const response = await axios.get(`${URL}/get-achievement`, {
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

export async function postAchivement(token, data) {
  try {
    const response = await axios.post(`${URL}/achievement`, data, {
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

export async function fetchLevels(token) {
  try {
    const response = await axios.get(`${URL}/get-level`, {
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

export async function postLevel(token, data) {
  try {
    const response = await axios.post(`${URL}/level`, data, {
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
