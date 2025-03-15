import axios from "axios";
import { URL } from "./base";
export async function getCategories(token) {
  try {
    const call = await axios.get(
      `${URL}/get-category?search=&per_page=10&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return call;
  } catch (error) {
    console.error(error);
  }
}
export async function addCategory(token, data) {
  try {
    const call = await axios.post(`${URL}/category`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Category  Added: ");
    console.log(call);

    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCategory(token, data, id) {
  try {
    const call = await axios.post(
      `${URL}/update-category?_method=PUT&category_id=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data);

    console.log("Categories Updated: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCategory(token, id) {
  try {
    const call = await axios.delete(`${URL}/delete-category?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Category Deleted: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function getBestVisitTime(token) {
  try {
    const call = await axios.get(`${URL}/get-best-visit-time`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Best Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function addBestVisitTime(token, data) {
  try {
    const call = await axios.post(`${URL}/best-visit-time?_method=PUT`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Added all Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBestVisitTime(token, id) {
  try {
    const call = await axios.delete(`${URL}/delete-best-visit-time?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Added all Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function getActivityLevels(token) {
  try {
    const call = await axios.get(`${URL}/get-activity-level`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Best Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function addActivityLevel(token, data) {
  try {
    const call = await axios.post(`${URL}/activity-level?_method=PUT`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Added all Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteActivityLevel(token, id) {
  try {
    const call = await axios.delete(`${URL}/delete-activity-level?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Added all Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function getKeywords(token) {
  try {
    const call = await axios.get(`${URL}/get-keyword`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Best Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function addKeyword(token, data) {
  try {
    const call = await axios.post(`${URL}/keyword?_method=PUT`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Added all Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteKeyword(token, id) {
  try {
    const call = await axios.delete(`${URL}/delete-keyword?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Added all Visit Times: ");
    console.log(call);
    return call;
  } catch (error) {
    console.error(error);
  }
}
