import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../../features/transactions/transactionSlice";
import Transaction from "./Transaction";
import { resetFilter } from "../../features/filter/filterSlice";

export default function Transactions() {
  const { transactions } = useSelector((state) => state.transactions);
  const filterData = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFilter());
    dispatch(fetchAllTransactions(filterData));
  }, [dispatch, filterData]);

  let lastTransactions = [];
  if (transactions.length !== 0) {
    for (let i = transactions?.length - 1; i >= 0; i--) {
      lastTransactions.push(transactions[i]);
    }
  }

  return (
    <>
      <p
        className={`second_heading ${
          transactions.length === 0 ? "text-red" : ""
        }`}>
        {transactions.length === 0 ? "Empty Transaction" : "Your Transactions:"}
      </p>

      <div className='container_of_list_of_transactions'>
        <ul>
          {lastTransactions.length !== 0 &&
            lastTransactions
              ?.splice(0, 5)
              .map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
        </ul>
        {transactions.length >= 5 && (
          <div className='view-more'>
            <Link to='/allTransactions' className='btn'>
              View More
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
