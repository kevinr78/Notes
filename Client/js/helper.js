import { BASE_URL } from "./config.js";


export async function sendAPIRequest(endpoint, methodType, payload) {
  let apiData, responseData, jwttoken ,headersSet;
  jwttoken = localStorage.getItem('token')

  if(jwttoken !==null){
    headersSet = {
      "Content-type": "application/json;charset=utf-8",
      "Authorization": "Bearer "+ jwttoken}
    }else{
      headersSet = {
        "Content-type": "application/json;charset=utf-8",
    }
    }
  
  try {
    apiData = await fetch(BASE_URL + endpoint, {
      method: methodType,
      headers:headersSet,
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
