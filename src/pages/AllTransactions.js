import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Transaction from "../components/Transactions/Transaction";
import { fetchAllTransactions } from "../features/transactions/transactionSlice";

const AllTransactions = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);
  return (
    <div className='container_of_list_of_transactions'>
      <div className='radio_group'>
        <input type='radio' value='income' name='transaction_type' checked />
        <label>Income</label>
        <input type='radio' value='expense' name='transaction_type' />
        <label>Expense</label>
        <input
          style={{ marginLeft: "50px" }}
          type='text'
          name='transaction_name'
          placeholder='search'
        />
      </div>
      <ul>
        {transactions?.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
};

export default AllTransactions;
