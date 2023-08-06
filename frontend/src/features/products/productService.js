import axios from "axios";
import { getCookie } from "../../middleware/getCookie";

const API_URL = "/api/products";

const listProduct = async (id) => {
  const response = await axios.get(`/api/products/${id}`);

  return response.data;
};

//retrieve products
const getProducts = async ({
  keyword = "",
  pageNumber = "",
  category = "",
  range = [0, 100000],
}) => {
  const token = decodeURI(getCookie("token"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}&range1=${range[0]}&range2=${range[1]}`,
    config
  );
  return response.data;
};
//retrieve all products
const getProductsAll = async () => {
  const token = decodeURI(getCookie("token"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/products/all`, config);
  return response.data;
};
//retrieve latest products
const getLatestProducts = async () => {
  const token = decodeURI(getCookie("token"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/products/latestproducts`, config);
  return response.data;
};
//retrieve trending products
const getTrendingProducts = async () => {
  const token = decodeURI(getCookie("token"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/products/trending`, config);
  return response.data;
};
//delete product
const deleteProduct = async (id) => {
  const token = decodeURI(getCookie("token"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/api/products/${id}`, config);
  return response.data;
};
const updateProduct = async (id, object) => {
  const token = decodeURI(getCookie("token"));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`/api/products/${id}`, object, config);
  return response.data;
};
const addProduct = async (object) => {
  const token = decodeURI(getCookie("token"));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`/api/products/`, object, config);
  return response.data;
};

const productService = {
  getProducts,
  listProduct,
  deleteProduct,
  updateProduct,
  addProduct,
  getLatestProducts,
  getProductsAll,
  getTrendingProducts,
};
export default productService;
