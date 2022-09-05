import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AllTransactions from "./pages/AllTransactions";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className='App'>
        <Header />
        <div className='main'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route
                path='/allTransactions'
                element={<AllTransactions />}></Route>
            </Routes>
          </div>
        </div>

        <div className='footer'>&copy;2022 Rafat Hossain</div>
      </div>
    </>
  );
}

export default App;
