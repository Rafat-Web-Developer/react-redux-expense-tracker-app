import axios from "../../utils/axiosInstance";

export const fetchTransactions = async () => {
  const response = await axios.get("/transactions");
  return response.data;
};
