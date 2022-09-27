import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { tokenReceived, loggedOut } from "./authSlice";

// const baseQueryEXAMPLE = fetchBaseQuery({ baseUrl: "/" });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     // try to get a new token
//     const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
//     if (refreshResult.data) {
//       // store the new token
//       api.dispatch(tokenReceived(refreshResult.data));
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(loggedOut());
//     }
//   }
//   return result;
// };

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const baseQueryAuth = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQueryAuth(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
  //     refreshToken: localStorage.getItem("refreshToken"),
  //   });

  //   localStorage.setItem("token", data.accessToken);
  //   localStorage.setItem("refreshToken", data.refreshToken);

  //   result = await baseQuery(args, api, extraOptions);
  // }

  return result;
};

const isAuthenticated = sessionStorage.getItem("token")
  ? baseQueryWithAuth
  : baseQuery;

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
});
