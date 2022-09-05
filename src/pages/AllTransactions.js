import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterSection from "../components/FilterSection";
import Transaction from "../components/Transactions/Transaction";
import { filteredTransactions } from "../features/filter/filterSlice";

const AllTransactions = () => {
  const { transactions, type, search } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filteredTransactions({ search, type }));
  }, [dispatch, search, type]);
  return (
    <div className='container_of_list_of_transactions'>
      {transactions.length > 0 && <FilterSection />}
      <ul>
        {transactions
          ?.filter((transaction) => transaction.type === type)
          .map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </div>
  );
};

export default AllTransactions;
