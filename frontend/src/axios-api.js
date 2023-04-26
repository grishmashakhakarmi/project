import axios from "axios";

const API = process.env.REACT_APP_API;
const getAPI = axios.create({
  baseURL: API,
  timeout: 820000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

//getAPI.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

export { getAPI };
