import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './componenets/SignIn';
import CreateWine from './components/CreateWine';
import EditWine from './components/EditWine';
import DetailedWine from './components/DetailedWine';


function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wines" element={<Wines />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile token={token}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
