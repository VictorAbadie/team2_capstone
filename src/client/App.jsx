import { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import NavBar from './components/NavBar';
import Home from './components/Home'
import NavbarComponent from './components/NavBar';
import { Container } from 'react-bootstrap'
import Cancel from '../pages/Cancel';
import Success from '../pages/Success'
import CartProvider from '../CartContext';

// import Login from './components/SignInForm';
// import SignUpForm from './components/SignUpForm';
import CreateWine from './components/CreateWine';
import EditWine from './components/EditWine';
import DetailedWine from './components/DetailedWine';

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
    <CartProvider>
      <BrowserRouter>
        < NavbarComponent></NavbarComponent>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path='/register' element={<SignUpForm/> } /> */}
          {/* <Route path="/profile" element={<Profile token={token}/>} /> */}

          {/* Protected Routes */}
          <Route path="/CreateWine" element={<CreateWine />} />
          {/* <Route path="/DeleteWine" element={<DeleteWine />} /> */}
          <Route path="/:id" element={<DetailedWine />} />
          <Route path="/EditWine" element={<EditWine />} />
          <Route path="/success" element={<Success/>} /> 
          <Route path="/cancel" element={<Cancel/>} /> 

        </Routes>
      </BrowserRouter>
      </CartProvider>
     
      
    </>
  );
}

export default App;
