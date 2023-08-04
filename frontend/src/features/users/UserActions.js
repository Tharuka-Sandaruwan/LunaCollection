import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

//called from logIn screen
export const logInUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await userService.login({ email, password });
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "users/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const data = await userService.register({ name, email, password });
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "users/getProfile",
  async (_, thunkAPI) => {
    try {
      const data = await userService.getProfile();
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const data = await userService.getAllUsers();
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const data = await userService.updateProfile({ name, email, password });
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
