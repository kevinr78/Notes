import { BASE_URL } from "./config.js";

/* export async function postDataToServer(task) {
  try {
    let response = await fetch(BASE_URL + "newTask", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Error while Processing/getting data");
    }

    let data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
} */

export async function sendAPIRequest(endpoint, methodType, payload) {
  let apiData, responseData;
  try {
    apiData = await fetch(BASE_URL + endpoint, {
      method: methodType,

      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    responseData = await apiData.json();

    if (!responseData.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    return responseData;
  }
}
