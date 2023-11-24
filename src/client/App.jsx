import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter} from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import CreateWine from './components/CreateWine';
import EditWine from './components/EditWine';
// import DetailedWine from './components/DetailedWine';
import SetAdminFunction from './components/isAdmin';


function App() {
  const [isAdmin, setIsAdmin] = useState(false) 
  const [token, setToken] = useState(null)
  console.log(isAdmin);
  const storageToken = sessionStorage.getItem("token");
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
      <BrowserRouter>
        < NavBar />
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/wines" element={<Wines />} /> */}
          {/* <Route path="/DetailedWine" element={<DetailedWine />} /> */}
          <Route path="/login" element={ <Login token={token} setToken={setToken} />} />
          <Route path='/register' element={<SignUpForm/> } />
          {/* <Route path="/profile" element={<Profile token={token}/>} /> */}

          {/* Protected Routes */}
          <Route path='/admin' element={<SetAdminFunction isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
            <Route path="/CreateWine" element={<CreateWine isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
          {/* <Route path="/DeleteWine" element={<DeleteWine isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} /> */}
          {/* <Route path="/DetailedWine" element={<DetailedWine />} /> */}
          <Route path="/EditWine" element={<EditWine isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
