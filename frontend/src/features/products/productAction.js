import { createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

//getProducts
export const listProducts = createAsyncThunk(
  "products/getAll",
  async (object, thunkAPI) => {
    try {
      return await productService.getProducts(object);
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
//getLatestProducts
export const latestProducts = createAsyncThunk(
  "products/getLatest",
  async (_, thunkAPI) => {
    try {
      return await productService.getLatestProducts();
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
//getTrendingProducts
export const trendingProducts = createAsyncThunk(
  "products/getTrending",
  async (_, thunkAPI) => {
    try {
      return await productService.getTrendingProducts();
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
//getAllProducts
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProductsAll();
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
export const getProduct = createAsyncThunk(
  "products/get",
  async (id, thunkAPI) => {
    try {
      return await productService.listProduct(id);
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
export const addProduct = createAsyncThunk(
  "product/add",
  async (object, thunkAPI) => {
    try {
      return await productService.addProduct(object);
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

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
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
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, object }, thunkAPI) => {
    try {
      console.log(id);
      return await productService.updateProduct(id, object);
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
