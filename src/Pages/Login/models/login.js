import { configureStore } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loginData: {},
  loginError: "",
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    saveLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    saveLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, saveLoginData, saveLoginError } = LoginSlice.actions;

export default LoginSlice.reducer;
