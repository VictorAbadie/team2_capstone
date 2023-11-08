// import {Button, Container, Navbar, Modal} from 'react-bootstrap'

// function NavBar() {

//     return (
//       // Determines where Navbar collapses
//       <NavBar>
//         {/* <Navbar.Brand href="/" >Good Luck Wines</Navbar.Brand> */}
//         {/* Allows some elements on mobile screens to collapse for more clean and crisp UI */}
//         {/* <NavBar.Toggle /> */}
//         {/* This allows you to decide WHAT collapses on the screen ///// justify-content-end pushes collapse menu to the right (end of line) vs left (front of line) */ }
//         {/* <NavBar.Collapse> */}
//             {/* <Button >Cart 0 items</Button> */}
//         {/* </NavBar.Collapse> */}
//       </NavBar>
//     )  
// }

// THIS WAS WORK FROM BEFORE I STARTED MAKING CHANGES TO THE CART / NARBAR, SAVING THEM IN PSEUDOCODE FOR NOW

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
          <button className="button" onClick>Logout</button>
        </nav>)
        };
        
        


export default NavBar;
