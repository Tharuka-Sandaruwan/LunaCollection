import { createSlice } from "@reduxjs/toolkit";

import {
  getNeedReviewProducts,
  reviewedProduct,
  reviewProduct,
  reviewProductByOrder,
} from "./reviewsAction.js";

const initialState = {
  needReviewList: [],
  reviewedList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  action: "",
};

export const reviewDataSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    resetReviewStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.action = "";
    },
    resetReviewData: (state) => {
      state.reviewedList = [];
      state.needReviewList = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.action = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNeedReviewProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.action = "getNeedReviewProducts";
      })
      .addCase(getNeedReviewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.needReviewList = action.payload;
        state.action = "getNeedReviewProducts";
      })
      .addCase(getNeedReviewProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "getNeedReviewProducts";
      })
      .addCase(reviewProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.action = "reviewProduct";
      })
      .addCase(reviewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        state.action = "reviewProduct";
      })
      .addCase(reviewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "reviewProduct";
      })
      .addCase(reviewProductByOrder.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.action = "reviewProductByOrder";
      })
      .addCase(reviewProductByOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        state.action = "reviewProductByOrder";
      })
      .addCase(reviewProductByOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "reviewProductByOrder";
      })
      .addCase(reviewedProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.action = "reviewedProduct";
      })
      .addCase(reviewedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviewedList = action.payload;
        state.action = "reviewedProduct";
        state.message = "";
      })
      .addCase(reviewedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "reviewedProduct";
      });
  },
});

export const { resetReviewStatus, resetReviewData } = reviewDataSlice.actions;
export default reviewDataSlice.reducer;
