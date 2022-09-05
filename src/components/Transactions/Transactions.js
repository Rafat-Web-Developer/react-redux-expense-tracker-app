import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../../features/transactions/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);
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
          {transactions?.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      </div>
    </>
  );
}
