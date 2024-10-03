import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoged: {
      LogIn: false,
      token: "",
      role: "",
      userName: "",
      departemnet: "",
    },
  },
  reducers: {
    LogIn: (s, a) => {
      s.isLoged = {
        LogIn: true,
        token: a.payload.token,
        role: a.payload.role,
        userName: a.payload.userName,
        departemnet: a.payload.departemnet,
      };
    },
    LogOut: (s) => {
      s.isLoged = {
        LogIn: false,
        token: "",
        role: "",
        userName: "",
        departemnet:"",
      };
    },
    Users: (s, a) => {
      s.isLoged = a.payload;
    },
  },
});

export const loginActions = AuthSlice.actions;
export default AuthSlice.reducer;
