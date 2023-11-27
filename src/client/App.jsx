import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import NavBar from './components/NavBar';
import Home from './components/Home'
import NavbarComponent from './components/NavBar';
import { Container } from 'react-bootstrap'
import Cancel from '../pages/Cancel';
import Success from '../pages/Success'
import CartProvider, { CartContext } from '../CartContext';
import Login from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import CreateWine from './components/CreateWine';
import EditWine from './components/EditWine';
import DeleteWine from './components/DeleteWine';
// import DetailedWine from './components/DetailedWine';
import SetAdminFunction from './components/isAdmin';


function App() {
  // const [token, setToken] = useState(null);
  const [cart, setCart] = useState([])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const [isAdmin, setIsAdmin] = useState(false) 
  const [token, setToken] = useState(null)
  console.log(isAdmin);
  const storageToken = localStorage.getItem("token");
  useEffect(() => {
    async function getToken(storageToken) {
      if (storageToken) {
        setToken(storageToken);
      } else {
        return;
      }      
    }
    getToken(storageToken);
  },[token, storageToken]);
 
  return (
    <>
    <CartProvider>
      <BrowserRouter>
        < NavbarComponent></NavbarComponent>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/wines" element={<Wines />} /> */}
          {/* <Route path="/DetailedWine" element={<DetailedWine />} /> */}
          <Route path="/login" element={ <Login token={token} setToken={setToken} />} />
          <Route path='/register' element={<SignUpForm/> } />
          {/* <Route path="/profile" element={<Profile token={token}/>} /> */}

          {/* Protected Routes */}
          {/* <Route path="/:id" element={<DetailedWine />} /> */}
          <Route path="/EditWine" element={<EditWine />} />
          <Route path="/success" element={<Success/>} /> 
          <Route path="/cancel" element={<Cancel/>} /> 

          <Route path='/admin' element={<SetAdminFunction isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
            <Route path="/CreateWine" element={<CreateWine isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
          <Route path="/DeleteWine" element={<DeleteWine isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
          {/* <Route path="/DetailedWine" element={<DetailedWine />} /> */}
          <Route path="/EditWine" element={<EditWine isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
     
      
    </>
  );
}

export default App;