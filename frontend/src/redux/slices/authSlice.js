import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:
      localStorage.getItem("user") !== null
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    userType:
      localStorage.getItem("userType") !== null
        ? localStorage.getItem("userType")
        : null,
    isLogin: localStorage.getItem("isLogin") ? true : false,
    verificationType: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.isLogin = true;
      localStorage.setItem("isLogin", true);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userType", JSON.stringify(action.payload.userType));
    },
    signUp(state, action) {
      state.verificationType = "signUp";
      state.userType = action.payload.userType;
      if (state.userType === "Teacher") {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user.teacher)
        );
        state.user = action.payload.user.teacher;
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user.student)
        );
        state.user = action.payload.user.teacher.student;
      }

      localStorage.setItem("userType", JSON.stringify(action.payload.userType));
    },
    logout(state) {
      state.user = null;
      state.userType = null;
      state.isLogin = false;
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    },
    forgetPassword(state, action) {
      state.verificationType = "forgetPassword";
      state.userType = action.payload.userType;
      if (state.userType === "Teacher") {
        state.user = action.payload.user.teacher;
      } else {
        state.user = action.payload.user.student;
      }
    },
    changePassword() {},
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authActions, authReducer };
