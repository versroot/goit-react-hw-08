import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for each : (pending, fulfilled, rejected), except logout
      // register
      .addCase(register.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.isRefreshing = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isRefreshing = false;
      })

      // logout
      .addCase(logout.fulfilled, () => initialState)

      // refreshUser
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export default authSlice.reducer;
