import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewsServices";

//get need review products
export const getNeedReviewProducts = createAsyncThunk(
  "reviews/needReview",
  async (object, thunkAPI) => {
    try {
      const response = await reviewService.getNeedReviewProducts(object);
      return response;
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
//review product
export const reviewProduct = createAsyncThunk(
  "review",
  async ({ id, object }, thunkAPI) => {
    try {
      console.log(id);
      console.log(object);
      const response = await reviewService.reviewProduct(id, object);
      return response;
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
//review product by order
export const reviewProductByOrder = createAsyncThunk(
  "reviewByOrder",
  async ({ orderId, id, object }, thunkAPI) => {
    try {
      console.log(id);
      console.log(object);
      const response = await reviewService.reviewProductByOrder(
        orderId,
        id,
        object
      );
      return response;
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
//get reviewed products by user
export const reviewedProduct = createAsyncThunk(
  "reviewedProducts",
  async (id, thunkAPI) => {
    try {
      const response = await reviewService.getReviewedProducts(id);
      return response;
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
