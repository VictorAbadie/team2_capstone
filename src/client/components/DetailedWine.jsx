
import {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from '../../CartContext';

const DetailedWine = (props) => {
    const {id} = useParams();
    const cart = useContext(CartContext);
    const [singleWine, setSingleWine] = useState([]);
    const [error, setError] = useState(null);
    const productQuantity = cart.getProductQuantity(singleWine.id);
    const product = props.products;
    

    useEffect(() => {
        
        async function getSingleWineById() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/wines/${id}/`
            );
            const result = await response.json();
        setSingleWine(result);
        } catch (error) {
            setError(error);
        }
    }
    getSingleWineById();
}, [])

return (
    <>
        <div className="detailsCard">   
                <img id="imgDetails" src={singleWine.img}></img>
            <h2>
                {singleWine.varietal}<br></br>
                ${singleWine.price}<br></br>
            </h2>
            <p className="wineDesc">{singleWine.description}</p>
            
            <button
                      className="button"
                      onClick={() => cart.addOneToCart(singleWine.id)}> Add to Cart
                    </button>

                    <button
                      className="button"
                      onClick={() => cart.removeOneFromCart(singleWine.id)}> Remove from Cart 
                    </button>
        </div>
    </>
)
}

export default DetailedWine