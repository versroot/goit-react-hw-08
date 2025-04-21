import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    // takes credits (name, email, password) as an argument, thunkAPI for error
    try {
      const response = await axios.post("/users/signup", credentials); // send a post request to the server with the credentials

      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`; // set header
      return response.data; // return (data + token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");

    delete axios.defaults.headers.common.Authorization; // remove header
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // takes nothing
    const state = thunkAPI.getState(); // get current state
    const token = state.auth.token; // get token from state
    if (!token) {
      // if no token, return error
      return thunkAPI.rejectWithValue("No token available");
    }
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`; // set header
      const response = await axios.get("/users/current"); // get current user data
      return response.data; // return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
