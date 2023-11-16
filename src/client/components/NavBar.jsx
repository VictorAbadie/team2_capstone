import { Link } from "react-router-dom";
// import Login from './components/SignInForm';
// import SignUpForm from './components/SignUpForm';
// I was getting error codes for having these so i commented them out, i fixed the relative path for them as well so you can use the function if you need it now 
// import Cart from './components/Cart';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const [signedIn, setSignedIn] = useState(false)
   
  useEffect(() => {  
    async function renderNavBar() {
      const token = sessionStorage.getItem("token")
      if (token) { 
        console.log("signed in")
        setSignedIn(true);
  }}
  renderNavBar()
    },[signedIn]);

  return (
    <>
        <nav>
          <Link to="/" className="nav-item"> Home </Link>
          <Link to="/login" className="nav-item"> Sign In </Link>
          <Link to="/register" className="nav-item"> Register </Link>
          <Link to="/Cart" className="nav-item"> Cart </Link>
          
        {/* <button className="button" onClick={Logout}>Logout</button> */}
        </nav>
        </>)
        };
        
        


export default NavBar;