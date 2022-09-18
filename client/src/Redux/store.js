import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import appSlice from "./Features/appSlice";
import authSlice from "./Features/auth/loginSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
