import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreateWine from './components/CreateWine';
import EditWine from './components/EditWine';
import DetailedWine from './components/DetailedWine';


function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/wines" element={<Wines />} /> */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/CreateWine" element={<CreateWine />} />
          <Route path="/DeleteWine" element={<DeleteWine />} />
          <Route path="/DetailedWine" element={<DetailedWine />} />
          <Route path="/EditWine" element={<EditWine />} />
          {/* <Route path="/profile" element={<Profile token={token}/>} /> */}
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
