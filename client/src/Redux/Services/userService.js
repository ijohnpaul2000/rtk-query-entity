import { api } from "../api";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

export const extendedUserSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/users",
      transformResponse: (response) => {
        const loadedUser = response.map((user) => {
          return {
            ...user,
          };
        });
        return userAdapter.setAll(initialState, loadedUser);
      },
    }),
    logoutUser: builder.mutation({
      query: () => "/api/auth/logout",
      invalidatesTags: ["User"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const selectUserResult = extendedUserSlice.endpoints.getUsers.select();

const selectUserData = createSelector(
  selectUserResult,
  (userResult) => userResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserId,
  selectEntities: selectUserEntities,
} = userAdapter.getSelectors((state) => selectUserData(state) ?? initialState);

export const { useGetUsersQuery, useLogoutUserMutation } = extendedUserSlice;
