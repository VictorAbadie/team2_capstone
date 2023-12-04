import { useState, useEffect, useContext } from 'react';
import { Card, Button, Form, Row, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import AdminFooter from './AdminFooter';
import { Link } from "react-router-dom";
import Logout from './logout';


const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const product = props.products;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(wines.id);
  // console.log(cart.items)


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

  useEffect(() => {
    // Check if there is a token with a number in local storage
    const token = localStorage.getItem('token');

    if (token && !isNaN(parseInt(token))) {
      // If there is a token with a number, set isLoggedIn to true
      setIsLoggedIn(true);
    } else {
      // If there is no token or it doesn't have a number, set isLoggedIn to false
      setIsLoggedIn(false);
    }
  }, []);



  return (
    <>
      {isLoggedIn ? <>(
            <button className="button" navigate='/' onClick={Logout}>logout</button>)</> 
            :
             <>(<div></div>)</>}

      {isAdmin ? (<>
      <AdminFooter/>
        <div id="allWinesCard" key={wines.id}>
          {!error &&
            wines.map((wine) => {
              // console.log("logged in as admin");

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
                  
                    <button
                      className="button"
                      id="homeCartButton"
                      onClick={() =>
                        cart.addOneToCart(wine.stripe_id)}>
                        Add to Cart
                    </button>
                    
                  </div>

                </>
                
              );
            })}
        </div>
      </>) : (
        // If the user is an admin everything above will render
        <div id="allWinesCard" key={wines.stripe_id}>
          {!error &&
            wines.map((wine) => {
              // console.log("logged in as user");
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
                    
                    <button
                      className="button"
                      id="homeCartButton"
                      onClick={() =>
                        cart.addOneToCart(wine.stripe_id)}>
                        Add to Cart
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

};

export default Home;