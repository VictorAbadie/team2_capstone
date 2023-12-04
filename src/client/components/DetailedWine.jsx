import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";

const DetailedWine = (props) => {
  const { id } = useParams();
  const cart = useContext(CartContext);
  const [singleWine, setSingleWine] = useState([]);
  const [error, setError] = useState(null);
  const productQuantity = cart.getProductQuantity(singleWine.id);
  const product = props.products;
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch isAdmin state from localStorage or sessionStorage, or wherever it is stored
  //   const token = parseInt(localStorage.getItem("token"));
  //   setIsAdmin(token);
  //   if (!isNaN(token) && token === 6) {
  //     // Set the user as admin
  //     setIsAdmin(true);
  //   } else {
  //     // Set the user as non-admin
  //     setIsAdmin(false);
  //   }
  // }, []);

  useEffect(() => {
    async function getSingleWineById() {
      try {
        const response = await fetch(`http://localhost:3000/api/wines/${id}/`);
        const result = await response.json();
        setSingleWine(result);
      } catch (error) {
        setError(error);
      }
    }
    getSingleWineById();
  }, []);

  
//also needs token passed once admin privileges are back
  const handleDelete = async (id) => {
    try {
        const response = await fetch (`http://localhost:3000/api/wines/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}`
        }
      });
        console.log(response);
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      {isAdmin ? (
        <>
          <div className="detailsCard">
            <img id="imgDetails" src={singleWine.img}></img>
            <h2>
              {singleWine.varietal}
              <br></br>${singleWine.price}
              <br></br>
            </h2>
            <p className="wineDesc">{singleWine.description}</p>

            <button
              className="button"
              onClick={() => cart.addOneToCart(singleWine.id)}
            >
              {" "}
              Add to Cart
            </button>

            <button
              className="button"
              onClick={() => cart.removeOneFromCart(singleWine.id)}
            >
              {" "}
              Remove from Cart
            </button>
            <button className="button" onClick={handleDelete}>Delete Wine</button>
          </div>
        </>
      ) : (
        // ADMIN ABOVE
        <div className="detailsCard">
          <img id="imgDetails" src={singleWine.img}></img>
          <h2>
            {singleWine.varietal}
            <br></br>${singleWine.price}
            <br></br>
          </h2>
          <p className="wineDesc">{singleWine.description}</p>

          <button
            className="button"
            onClick={() => cart.addOneToCart(singleWine.id)}
          >
            {" "}
            Add to Cart
          </button>

          <button
            className="button"
            onClick={() => cart.removeOneFromCart(singleWine.id)}
          >
            {" "}
            Remove from Cart
          </button>

          <button
            className="button"
            onClick={() => navigate('/')}
            >Back to All Wines</button>
        </div>
      )}
      {/* USER ABOVE */}
    </>
  );
};

export default DetailedWine;
