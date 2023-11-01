import { Link } from "react-router-dom";
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
    // <div>
      <nav>
        <Link to="/" className="nav-item">
          Home
        </Link>
      {/* </nav> */}
    
      {/* {loggedIn ? (
        <nav> */}
        <Link to="/profile" className="nav-item">
        Profile
        </Link>
          <button className="button" onClick={Logout}>Logout</button>
        </nav>)
        };
        
        


export default NavBar;
