import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import Inventory from './Inventory.jsx';
import Delivery from './Delivery.jsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Orders from "./Orders";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/inventory' element={<Inventory />}></Route>
          <Route path='/delivery' element={<Delivery />}></Route>
          <Route path='/placeorders' element={<Orders />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
