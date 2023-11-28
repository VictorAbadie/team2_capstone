import Button from "react-bootstrap/Button"
// Gives us access to our delete function from the CartContext
import { CartContext } from "../../CartContext"
import { useContext } from "react"
// Gives us access to the function that gives us price and title of individual ids
import { getProductData } from "../../ productsStore";


function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData = getProductData(id);

    return (
        <>
        <h3>{productData.varietal}</h3>
        <p>{quantity} total</p>
        <p>${ (quantity * productData.price).toFixed(2) }</p>
        <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
        {/* Line break for styling */}
        <hr></hr>
        </>
    )

}

export default CartProduct;