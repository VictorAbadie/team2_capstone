import { Link } from "react-router-dom";
import { Button, Navbar, Modal } from 'react-bootstrap';
import Logout from './logout';
// import AdminFooter from "./adminFooter";
import { CartContext } from "../../CartContext";
import CartProduct from "./CartProduct";

// deleted Button and Container from react-bootstrap import line

// import Login from './components/SignInForm';
// import SignUpForm from './components/SignUpForm';
// I was getting error codes for having these so i commented them out, i fixed the relative path for them as well so you can use the function if you need it now 
// import Cart from './components/Cart';
import { useState, useEffect, useContext } from 'react';

function NavbarComponent() {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch isAdmin state from localStorage or sessionStorage, or wherever it is stored
    const token = parseInt(localStorage.getItem('token'));
    setIsAdmin(token);
    if (!isNaN(token) && token === 6) {
        // Set the user as admin
        setIsAdmin(true);
      } else {
        // Set the user as non-admin
        setIsAdmin(false);
        // < Logout />
      }
  }, []);

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
            "Content-Type" : 'application/json'
        },
        // Pass items from the cart to the backend (follow logic to server.js)
        body: JSON.stringify({items: cart.items})
    }).then((response) => {
        // Get response from backend with new url and turn it into json
        return response.json();
    }).then((response) => {
        // Get URL out of the JSON
        if(response.url) {
        // Forward user to stripe
            window.location.assign(response.url)
        }
    })
}

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)

  return (
    <>
    <header>
          <h1 className='GLW'>Good Luck Wines</h1>
          <h3 className='subtitle'>If one glass of wine is good for you, imagine what a whole bottle can do!</h3>
        </header>

    <Navbar expand="sm">
      <>
    <nav>
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/login" className="nav-item">Sign In</Link>
          <Link to="/register" className="nav-item">Register</Link>              
        {/* <Navbar.Brand href="/">Home</Navbar.Brand> */}
        {/* <Navbar.Toggle/> */}
        <Navbar.Collapse>
          <Button className='cartButton' onClick={handleShow}>Cart: ({productsCount} Items)</Button>
        </Navbar.Collapse>
    </nav>
    </>

    </Navbar>
    <Modal className="cart" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {productsCount > 0 ?
        <>
          <p>Items in your cart:</p>
          {cart.items.map((currentProduct, idx) => (
            
            <CartProduct key={idx} id={currentProduct.id} quantity = {currentProduct.quantity}></CartProduct>
          ))}

          <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

          <Button className='button' onClick={checkout}>
            Purchase Items!
          </Button>
        </>
      :
      
      
        <h1>There are no items in the cart!</h1>
        }
      </Modal.Body>

    </Modal>
    </>
)};

        
        


export default NavbarComponent;