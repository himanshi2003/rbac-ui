import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:50001", // JSON Server URL and port
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
