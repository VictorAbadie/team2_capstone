import {Button, Container, Navbar, Modal } from 'react-bootstrap'
import {useState, useContext} from 'react'
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';


function NavbarComponent () {
    const cart = useContext(CartContext);
    // Defining show variable and ensuring that modal does NOT open when you first enter the website
    const [ show, setShow] = useState(false);
    // if this event happens, hide the modal
    const handleClose = () => setShow(false);
    // if this even happens, show the modal
    const handleShow = () => setShow(true);

    // Once we hit checkout, we are going to send a post request to our checkout route @ localhost:4000
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

    // This reduce allows us to sum of all of the products.quantities and this statement returns a number. Counter starts at 0
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        // This fragment seperates the Navbar and Modal component
        <>
        
        {/* // Determines where navbar collapses on mobile + tablet devices */}
        <Navbar expand="sm">
            {/* Big title to the left of the page */}
            <Navbar.Brand href='/'>Ecommerce Store</Navbar.Brand>
            {/* Allows us to have a collapsable screen if being used on mobile device or smaller screen */}
            <Navbar.Toggle/>
            {/* Allows us to tell the navbar what we want to have collapse / CSS allows for collapse to happen on the right instead of left */}
            <Navbar.Collapse className="justify-content-end">
                {/* This onClick allows the modal to show when the cart button is clicked */}
                <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
            </Navbar.Collapse>
        </Navbar>
        {/* Modal show allows the modal to show and the onHide calls the function   */}
        <Modal show={show} onHide={handleClose}>
            {/* Shows the user that they can close the cart */}
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {productsCount > 0 ?
                <>
                 <p>Items in your cart:</p>
                 {cart.items.map((currentProduct, idx) => (
              
                    <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                 ))}    
                    {/* Get the total cost of the items in the cart and round to only 2 numbers after the decimal */}
                 <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                {/* When we click this button, it takes us to checkout */}
                 <Button variant="success" onClick={checkout}>
                    Purchase items!
                 </Button>
                </>
            :
            <h1>There are no items in your cart!</h1>

            }

            </Modal.Body>

        </Modal>
        </>
    )

}

export default NavbarComponent