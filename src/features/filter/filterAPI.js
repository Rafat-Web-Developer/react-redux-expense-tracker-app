import axios from "../../utils/axiosInstance";

export const fetchFilteredTransaction = async (search, type) => {
  let searchString = "";
  let typeString = "";
  if (search !== "") {
    searchString = `q=${search}`;
  }
  if (type !== "") {
    typeString = `type_like=${type}`;
  }
  const response = await axios.get(
    `/transactions?${searchString}&${typeString}`
  );
  return response.data;
};
