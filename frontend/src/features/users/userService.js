import axios from "axios";
import { getCookie } from "../../middleware/getCookie";

//service function to logIn
const login = async ({ email, password }, config) => {
  const response = await axios.post(
    `/api/users/login`,
    { email, password },
    config
  );
  return response.data;
};
const register = async ({ name, email, password }) => {
  const response = await axios.post("/api/users/", { name, email, password });
  return response.data;
};
