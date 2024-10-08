import { configureStore } from "@reduxjs/toolkit";
import LogReducer from "./logInSlice";
import IncidentReducer from "./incidentSlice";

export const store = configureStore({
  reducer: {
    LogIn: LogReducer,
    Icidents: IncidentReducer,
  },
});
