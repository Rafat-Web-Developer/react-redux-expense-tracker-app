import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setType } from "../features/filter/filterSlice";

const FilterSection = () => {
  const { type } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const handleType = (typeName) => {
    dispatch(setType(typeName));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchText));
    setSearchText("");
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
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginLeft: "50px" }}
          type='text'
          name='transaction_name'
          value={searchText}
          placeholder='search'
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default FilterSection;
