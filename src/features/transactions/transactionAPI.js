import axios from "../../utils/axiosInstance";

export const fetchTransactions = async ({ search, type, page, limit }) => {
  let searchString = "";
  let typeString = "";
  let pageString = "";
  let limitString = "";
  let url = "";
  if (search !== "") {
    searchString = `q=${search}`;
  }
  if (type !== "") {
    typeString = `type_like=${type}`;
  }
  if (page) {
    pageString = `_page=${page}`;
  }
  if (limit > 0) {
    limitString = `_limit=${limit}`;
  }

  if (search === "" && type === "" && page === 1 && limit === 0) {
    url = `/transactions`;
    console.log(url);
  } else {
    url = `/transactions?${pageString}&${limitString}&${searchString}&${typeString}`;
    console.log(url);
  }

  const response = await axios.get(url);

  const responseTypeTotal = await axios.get(`/transactions/?${typeString}`);
  return {
    searchData: response.data,
    totalData: responseTypeTotal.data.length,
  };
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);
  return response.data;
};

export const updateTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = axios.delete(`/transactions/${id}`);

  return response.data;
};
