import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import Register from './components/Register';
import './Register.css'
// There is some prebuilt css in the Register.css file. Im going to go through and psuedo code the shit outta the Register css and jsx file to try and make stuff easier to either integrate into a later style sheet or to call onto class names.


// import CreateWine from './components/CreateWine';
// import EditWine from './components/EditWine';
// import DetailedWine from './components/DetailedWine';

// temporarily commented out otherwise page will not load. DAMMIT ADRIENNE!!!!!!!!!!!!!!!!!!

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

          <Route path='/SignUp' element={<Register/> } />


        
          {/* <Route path="/CreateWine" element={<CreateWine />} />
          <Route path="/DeleteWine" element={<DeleteWine />} />
          <Route path="/DetailedWine" element={<DetailedWine />} />
          <Route path="/EditWine" element={<EditWine />} /> */}

          {/* <Route path="/profile" element={<Profile token={token}/>} /> */}
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
