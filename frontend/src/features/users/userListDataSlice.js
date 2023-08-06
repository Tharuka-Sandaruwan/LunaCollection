import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getAllUsers } from "./UserActions";

const initialState = {
  usersList: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  action: "",
};

export const userListDataSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    resetUsersListStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.action = "";
    },
    resetUsersList: (state) => {
      state.usersList = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.action = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //for logIn User
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.action = "getAllUsers";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.action = "getAllUsers";
        state.usersList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.usersList = null;
        state.isError = true;
        state.message = action.payload;
        state.action = "getAllUsers";
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.action = "deleteUser";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.action = "deleteUser";
        state.message = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "deleteUser";
      });
  },
});

export const { resetUsersListStatus, resetUsersList } =
  userListDataSlice.actions;
export default userListDataSlice.reducer;
