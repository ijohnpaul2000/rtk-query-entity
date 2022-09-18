import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    TOGGLE_SIDEBAR: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { TOGGLE_SIDEBAR } = appSlice.actions;
export default appSlice.reducer;
