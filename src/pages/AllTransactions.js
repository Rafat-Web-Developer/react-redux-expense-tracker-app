import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterSection from "../components/FilterSection";
import Transaction from "../components/Transactions/Transaction";
import { setLimit, setPageNumber } from "../features/filter/filterSlice";
import { fetchAllTransactions } from "../features/transactions/transactionSlice";

const AllTransactions = () => {
  const filterData = useSelector((state) => state.filters);
  const { transactions, total } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLimit(10));
    dispatch(fetchAllTransactions(filterData));
  }, [dispatch, filterData]);

  const pageNumber = Math.ceil(total / 10);

  return (
    <div className='container_of_list_of_transactions'>
      {transactions.length > 0 && <FilterSection />}
      <ul>
        {transactions?.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      {total > 10 && (
        <div className='pagination'>
          <div>
            {[...Array(pageNumber)].map((_, index) => (
              <span
                key={index}
                className='pageNumber'
                onClick={() => dispatch(setPageNumber(index + 1))}>
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
