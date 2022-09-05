import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  editTransaction,
  removeEditData,
} from "../features/transactions/transactionSlice";

export default function Form() {
  const { isLoading, isError, editing } = useSelector(
    (state) => state.transactions
  );
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { id, name, amount, type } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      resetForm();
    }
  }, [editing]);

  const resetForm = () => {
    setName("");
    setType("");
    setAmount("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editTransaction({
        id: editing.id,
        data: {
          name,
          type,
          amount: Number(amount),
        },
      })
    );
    resetForm();
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    dispatch(removeEditData());
    resetForm();
  };

  return (
    <div className='form'>
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleEditSubmit : handleSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            name='transaction_name'
            placeholder='My Salary'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='form-group radio'>
          <label>Type</label>
          <div className='radio_group'>
            <input
              type='radio'
              value='income'
              name='transaction_type'
              checked={type === "income"}
              onChange={(e) => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className='radio_group'>
            <input
              type='radio'
              value='expense'
              name='transaction_type'
              placeholder='Expense'
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className='form-group'>
          <label>Amount</label>
          <input
            type='number'
            placeholder='300'
            name='transaction_amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button disabled={isLoading} className='btn' type='submit'>
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {!isLoading && isError && (
          <p className='error'>There was an error occured</p>
        )}
      </form>

      {editMode && (
        <button className='btn cancel_edit' onClick={handleCancelEdit}>
          Cancel Edit
        </button>
      )}
    </div>
  );
}
