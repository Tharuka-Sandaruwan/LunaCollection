import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProduct,
  getAllProducts,
  latestProducts,
  listProducts,
  trendingProducts,
} from "./productAction";

const initialState = {
  products: null,
  trending: [],
  latest: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  action: "",
};

export const productListDataSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    resetProductList: (state) => {
      state.products = null;
      state.allProducts = null;
      state.latest = [];
      state.trending = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.action = "";
    },
    resetProductListStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.action = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.action = "getAllProducts";
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        state.action = "getAllProducts";
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "getAllProducts";
        //state.products=[]
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.action = "getAllProducts";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allProducts = action.payload;
        state.action = "getAllProducts";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "getAllProducts";
      })
      .addCase(latestProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.action = "latestProducts";
      })
      .addCase(latestProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.latest = action.payload;
        state.action = "latestProducts";
      })
      .addCase(latestProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "latestProducts";
      })
      .addCase(trendingProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.action = "trendingProducts";
      })
      .addCase(trendingProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trending = action.payload;
        state.action = "trendingProducts";
      })
      .addCase(trendingProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "trendingProducts";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.action = "deleteProduct";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.isSuccess = true;
        state.message = action.payload;
        state.action = "deleteProduct";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.action = "deleteProduct";
        //state.product = []
      });
  },
});

export const { resetProductList, resetProductListStatus } =
  productListDataSlice.actions;
export default productListDataSlice.reducer;
