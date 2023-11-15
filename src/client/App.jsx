import { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar'
import Login from './components/Login';
import Register from './components/Register';
import './Register.css'
// There is some prebuilt css in the Register.css file. Im going to go through and psuedo code the shit outta the Register css and jsx file to try and make stuff easier to either integrate into a later style sheet or to call onto class names.

import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/RequireAuth';
import CreateWine from './components/CreateWine';
// import EditWine from './components/EditWine';
// import DetailedWine from './components/DetailedWine';

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <BrowserRouter>
        < NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<Login />} />
          <Route path='/SignUp' element={<Register/> } />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
          <Route path="/CreateWine" element={<CreateWine />} />
          {/* <Route path="/DeleteWine" element={<DeleteWine />} /> */}
          {/* <Route path="/DetailedWine" element={<DetailedWine />} />
          <Route path="/EditWine" element={<EditWine />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
