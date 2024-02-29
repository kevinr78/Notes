import { BASE_URL } from "./config.js";

export async function sendAPIRequest(endpoint, methodType, payload) {
  let apiData, responseData, jwttoken, headersSet, requestOptions;

  jwttoken = localStorage.getItem("token");

  if (jwttoken !== null) {
    headersSet = {
      "Content-type": "application/json;charset=utf-8",
      Authorization: "Bearer " + jwttoken,
    };
  } else {
    headersSet = {
      "Content-type": "application/json;charset=utf-8",
    };
  }
  requestOptions = {
    method: methodType,
    headers: headersSet,
  };

  if (methodType !== "GET" && payload !== null) {
    requestOptions.body = JSON.stringify(payload);
  }

  try {
    apiData = await fetch(BASE_URL + endpoint, requestOptions);

    responseData = await apiData.json();

    if (!responseData.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    return responseData;
  }
}
