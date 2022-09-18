import { api } from "../../api";

export const extendedAuthSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/auth",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        sessionStorage.setItem("token", response.token);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = extendedAuthSlice;
