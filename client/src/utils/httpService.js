import axios from "axios";

export const httpService = axios.create({
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Headers": "Content-Type,Cookie",
  },
});

httpService.interceptors.request.use((req) => {
  //Use this place to send the token in the API request headers.
  return req;
});

httpService.interceptors.response.use((req) => {
  //Use this place

  return req;
});
