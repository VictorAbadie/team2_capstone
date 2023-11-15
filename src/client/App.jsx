import { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import CreateWine from './components/CreateWine';
import EditWine from './components/EditWine';
import DetailedWine from './components/DetailedWine';

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <BrowserRouter>
        < NavBar />
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/wines" element={<Wines />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<SignUpForm/> } />
          {/* <Route path="/profile" element={<Profile token={token}/>} /> */}

          {/* Protected Routes */}
          <Route path="/CreateWine" element={<CreateWine />} />
          {/* <Route path="/DeleteWine" element={<DeleteWine />} /> */}
          <Route path="/DetailedWine" element={<DetailedWine />} />
          <Route path="/EditWine" element={<EditWine />} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
