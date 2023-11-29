import { useState, useEffect, useContext } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";
import AdminFooter from "./AdminFooter";
import Logout from "./logout";

const Home = (props) => {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const product = props.products;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(wines.id);
  // console.log(cart.items)

  const token = localStorage.getItem("token");
  // console.log(token)

  useEffect(() => {
    // Fetch isAdmin state from localStorage or sessionStorage, or wherever it is stored
    const token = parseInt(localStorage.getItem("token"));
    setIsAdmin(token);
    if (!isNaN(token) && token === 6) {
      // Set the user as admin
      setIsAdmin(true);
    } else {
      // Set the user as non-admin
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    async function fetchAllWines() {
      try {
        const response = await fetch(`http://localhost:3000/api/wines`);
        const result = await response.json();
        setWines(result);
      } catch (error) {
        setError(error);
      }
    }
    fetchAllWines();
  }, []);

  return (
    <>
      {isAdmin ? (
        <div id="allWinesCard" key={wines.id}>
          <AdminFooter/>
          {!error &&
            wines.map((wine) => {
              console.log("logged in as admin");

              return (
                <>
                  <div className="wineCard">
                    <img id="homeImg" src={wine.img}></img>
                    <p className="wineFacts">{wine.varietal}</p>
                    <p className="wineFacts">${wine.price}</p>

                    <button
                      className="button"
                      onClick={() => {
                        navigate(`/${wine.id}`);
                      }}
                    >
                      {" "}
                      See Details
                    </button>
                    
                  </div>

                </>
                
              );
            })}
        </div>
      ) : (
        // If the user is an admin everything above will render
        <div id="allWinesCard" key={wines.id}>
          {!error &&
            wines.map((wine) => {
              console.log("logged in as user");
              return (
                <>
                  <div className="wineCard">
                    <img id="homeImg" src={wine.img}></img>
                    <p className="wineFacts">{wine.varietal}</p>
                    <p className="wineFacts">${wine.price}</p>

                    <button
                      className="button"
                      onClick={() => {
                        navigate(`/${wine.id}`);
                      }}
                    >
                      {" "}
                      See Details
                    </button>
                    
                  </div>
                  {/* if the user is not an admin everything above will render */}
                </>
              );
            })}
        </div>
      )}
    </>
  );

  //   return (
  //     // Everything lives within this card
  //     <Card>
  //         {/* And this card */}
  //         <Card.Body>
  //             {/* Gives us nicely styled card for our title */}
  //             <Card.Title> {wines.varietal} </Card.Title>
  //             <Card.Text>${wines.price}</Card.Text>
  //             {productQuantity > 0 ?
  //             <>
  //             <Form as={Row}>
  //             <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
  //             <Col sm="6">
  //                 <Button sm="6" onClick={() => cart.removeOneFromCart(wine.id)} className="mx-2">-</Button>
  //                 <Button sm="6" onClick={() => cart.addOneToCart(wine.id)} className="mx-2">+</Button>
  //             </Col>
  //             </Form>
  //             <Button variant="danger" onClick={() => cart.deleteFromCart(wines.id)}  className="my-2">Remove from Cart</Button>
  //             </>
  //             :
  //             <Button variant="primary" onClick={() => cart.addOneToCart(wines.id)}>Add to Cart</Button>

  //             }

  //         </Card.Body>

  //     </Card>
  // )
};

export default Home;

// import {Row, Col} from 'react-bootstrap';
// // This gives us access to the productsArray in our productsStore.js
// import { productsArray } from '../../ productsStore';
// import ProductCard from './ProductCard';

// function Home() {
//     return (
//         <>
//         {/* align="center is adjusting the header of the store to the center of the page and the className="p-3" is responsible for the padding between the header and the items */}
//         <h1 align="center" className="p-3">Good Luck Wines</h1>
//         {/* We're using rows and colums to align the products on our site. on xs screens, it'll show one column / row and on larger screens, 3 */}
//         <Row xs={1} md={3} className="g-4">
//             {/*Allows us to go through every element in the array and then allows us to specific logic based of the element that we're at but most importantly, allows us to return react.jsx for a certain element  */}
//             {productsArray.map((product, idx) => (
//                 // key={idx} gives specific keys to our columns and is best react practice
//                             <Col align="center" key={idx}>
//                                 {/* The first "product" defines the property and the second "product" looks at the product that we're mapping over //// we are able to access the product= because in our ProductCard.js, we have the variable product = props.product  */}
//                             <ProductCard product={product}/>
//                         </Col>
//             ))}

//         </Row>
//         </>
//     )
// }

// export default Home;
