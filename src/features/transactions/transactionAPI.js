import axios from "../../utils/axiosInstance";

export const fetchTransactions = async () => {
  console.log("Come");
  const response = await axios.get("/transactions");
  return response.data;
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);
  return response.data;
};
