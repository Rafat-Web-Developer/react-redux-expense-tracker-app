import axios from "../../utils/axiosInstance";

export const fetchFilteredTransaction = async (search, type, page) => {
  let searchString = "";
  let typeString = "";
  let pageString = "";
  if (search !== "") {
    searchString = `q=${search}`;
  }
  if (type !== "") {
    typeString = `type_like=${type}`;
  }
  if (page) {
    pageString = `_page=${page}`;
  }
  const response = await axios.get(
    `/transactions?${pageString}&_limit=10&${searchString}&${typeString}`
  );
  const responseTotal = await axios.get(`/transactions/?${typeString}`);
  return {
    searchData: response.data,
    totalData: responseTotal.data.length,
  };
};
