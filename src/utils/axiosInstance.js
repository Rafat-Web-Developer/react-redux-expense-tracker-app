import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://learn-with-summit-server.herokuapp.com",
});

export default axiosInstance;
