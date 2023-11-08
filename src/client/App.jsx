import { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
// This import is necessary because it has the sytle sheets that we need for bootstrap components
// import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import './Register.css'
// There is some prebuilt css in the Register.css file. Im going to go through and psuedo code the shit outta the Register css and jsx file to try and make stuff easier to either integrate into a later style sheet or to call onto class names.

import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/RequireAuth';
import CreateWine from './components/CreateWine';
import EditWine from './components/EditWine';
import DetailedWine from './components/DetailedWine';

function App() {
  const [token, setToken] = useState(null);
  return (
    <Container>
      {/* <NavBar></NavBar> */}
      <BrowserRouter>
  
 
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/wines" element={<Wines />} /> */}
          <Route path="/SignIn" element={<Login />} />
          <Route path='/SignUp' element={<Register/> } />
          {/* <Route path="/profile" element={<Profile token={token}/>} /> */}

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
          <Route path="/CreateWine" element={<CreateWine />} />
          {/* <Route path="/DeleteWine" element={<DeleteWine />} /> */}
          <Route path="/DetailedWine" element={<DetailedWine />} />
          <Route path="/EditWine" element={<EditWine />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </Container>
  );
}

export default App;
