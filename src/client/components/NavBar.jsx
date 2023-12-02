import { Link } from "react-router-dom";
import { Button, Navbar, Modal } from 'react-bootstrap';
import Logout from './logout';
import { CartContext } from "../../CartContext";
import CartProduct from "./CartProduct";

// deleted Button and Container from react-bootstrap import line

// import Cart from './components/Cart';
import { useState, useEffect, useContext } from 'react';

function NavbarComponent() {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/login" className="nav-item">Sign In</Link>
            <Link to="/register" className="nav-item">Register</Link>
        <>
      <nav>

          <Navbar.Collapse>
            <Button className="button" onClick={handleShow}>Cart: ({productsCount} Items)</Button>
          </Navbar.Collapse>

      </nav>
      </>

      </Navbar>
      
    <button className="button" navigate='/' onClick={Logout}>logout</button>
    <Modal className="cart"show={show} onHide={handleClose}>
      <Modal.Header>
          <Modal.Title className="cartTitle" >Shopping Cart</Modal.Title>

   
      </Modal.Header>
      <Modal.Body>
      <Button className='button' onClick={handleClose}>
            Exit Cart
          </Button>
        {productsCount > 0 ?
        <>
          <h1>Items in your cart:</h1>
          {cart.items.map((currentProduct, idx) => (
            
            <CartProduct key={idx} id={currentProduct.id} quantity = {currentProduct.quantity}></CartProduct>
          ))}

          <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>

          <Button className='button' onClick={checkout}>
            Purchase Wine!
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
