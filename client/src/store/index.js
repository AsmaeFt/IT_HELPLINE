import { configureStore } from "@reduxjs/toolkit";
import LogReducer from "./logInSlice";

export const store = configureStore({
  reducer: {
    LogIn: LogReducer,
  },
});
