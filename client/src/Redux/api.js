import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const token = localStorage.getItem("token");

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;

  // if (result.error && result.error.status === 401) {
  //   const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
  //     refreshToken: localStorage.getItem("refreshToken"),
  //   });

  //   localStorage.setItem("token", data.accessToken);
  //   localStorage.setItem("refreshToken", data.refreshToken);

  //   result = await baseQuery(args, api, extraOptions);
  // }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
});
