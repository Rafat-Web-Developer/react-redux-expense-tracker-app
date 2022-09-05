import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
  removeTransaction,
  setEditData,
} from "../../features/transactions/transactionSlice";

export default function Transaction({ transaction }) {
  const dispatch = useDispatch();
  const { id, name, amount, type } = transaction;

  const handleEdit = () => {
    dispatch(setEditData(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className='right'>
        <p>৳ {amount}</p>
        <button className='link' onClick={handleEdit}>
          <img alt='Edit' className='icon' src={editImage} />
        </button>
        <button className='link' onClick={handleDelete}>
          <img alt='Delete' className='icon' src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
