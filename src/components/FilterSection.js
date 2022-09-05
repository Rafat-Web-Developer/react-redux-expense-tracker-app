import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../features/filter/filterSlice";

const FilterSection = () => {
  const { type } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const handleType = (typeName) => {
    dispatch(setType(typeName));
  };
  return (
    <div className='radio_group'>
      <input
        type='radio'
        value='income'
        name='transaction_type'
        checked={type === "income" ? true : false}
        onChange={(e) => handleType(e.target.value)}
      />
      <label>Income</label>
      <input
        type='radio'
        value='expense'
        name='transaction_type'
        checked={type === "expense" ? true : false}
        onChange={(e) => handleType(e.target.value)}
      />
      <label>Expense</label>
      <input
        style={{ marginLeft: "50px" }}
        type='text'
        name='transaction_name'
        placeholder='search'
      />
    </div>
  );
};

export default FilterSection;
