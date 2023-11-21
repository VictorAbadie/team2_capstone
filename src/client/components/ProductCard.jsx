// import { Card, Button, Form, Row, Col} from 'react-bootstrap';
// // Import our cart context from Cartcontext.js
// import { CartContext } from '../../CartContext';
// import { useContext } from 'react';


// function ProductCard(props) { //props.product is the product that we are selling
//     const product = props.product;
//     // Access our cart "object". Use content of cart context
//     const cart = useContext(CartContext)
//     // Allows us to see if an item is in our cart or not
//     const productQuantity = cart.getProductQuantity(product.id)

//     return (
//         // Everything lives within this card
//         <Card>
//             {/* And this card */}
//             <Card.Body>
//                 {/* Gives us nicely styled card for our title */}
//                 <Card.Title> {product.type} </Card.Title>
//                 <Card.Text>${product.price}</Card.Text>
//                 {productQuantity > 0 ?
//                 <>
//                 <Form as={Row}>
//                 <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
//                 <Col sm="6">
//                     <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
//                     <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
//                 </Col>
//                 </Form>
//                 <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)}  className="my-2">Remove from Cart</Button>
//                 </>
//                 :
//                 <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add to Cart</Button>

//                 }

                
//             </Card.Body>

//         </Card>
//     )
// }

// export default ProductCard;