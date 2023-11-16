import { Link } from "react-router-dom";
// import LogIn from './SignInForm';
// import SignUpForm from './SignUpForm';
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
          <Link to="/signin" className="nav-item"> Sign In </Link>
          <Link to="/SignUp" className="nav-item"> Register </Link>
          <Link to="/Cart" className="nav-item"> Cart </Link>
          
        {/* <button className="button" onClick={Logout}>Logout</button> */}
        </nav>
        </>)
        };
        
        


export default NavBar;