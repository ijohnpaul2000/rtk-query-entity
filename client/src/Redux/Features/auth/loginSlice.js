import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  user_level: null,
  accessToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload.username;
      state.user_level = action.payload.user_level;
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
    },
    LOGOUT: (state) => {
      state.user = null;
      state.user_level = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const selectCurrentUser = (state) => state.auth;

export const { LOGIN, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
