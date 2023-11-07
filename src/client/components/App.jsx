import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import cartProvider from './components/Cart'
function App() {
  const [token, setToken] = useState(null);
  return (
    <>
    <cartProvider>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/wines" element={<Wines />} /> */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          {/* <Route path="/profile" element={<Profile token={token}/>} /> */}
        </Routes>
      </BrowserRouter>
      </cartProvider>
    </>
  );
}

export default App;
