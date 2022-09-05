import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className='header'>
      <h1 onClick={handleNavigate}>Expense Tracker</h1>
    </div>
  );
};

export default Header;
