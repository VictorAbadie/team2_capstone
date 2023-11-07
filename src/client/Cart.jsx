import { createContext, useState } from "react";
import { wines } from "../db/seed.js"



//Function setup
const cartContext = createContext({
    items:[],
    getWineQuantity: () => {},
    addToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
})

//Adding deleting and removing function

export function cartProvider({children}) {
    const [cartProducts, setCartProducts]=usestate([])


    function getWineQuantity(id) {
        cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) {
            return 0;
        }
    }

    function addToCart(id) {
        const quantity = getWineQuantity(id);


        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id:id,
                        quantity:1
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? {...product, qunatity: product.quantity +1} //Adding an item to the cart if it is not already in the cart
                    : product
                )
            )
        }
    }


    function getTotalCost() {
        let totalCost= 0
        cartProducts.map((cartItem) => {
            const productData = getProdctData(cartItem.id);
            totalCost+= (productData.price * cartItem.quantity)
        });
        return totalCost
    }


    function removeOneFromCart(id) {
        const qunatity = getWineQuantity(id);

        if (qunatity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? {...product, qunatity: product.quantity - 1} //Removing an item from the cart
                    : product
                ) 
            )
        }
    }




    function deleteFromCart(id) {
        setCartProducts(
            cartProducts =>
            cartProducts.filter()
        )
    }

    const contextValue = {
    items: [],
    getWineQuantity,
    addToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost
    }
    return (
        <CartContext.Provider value= {contextValue}>
            {chidren}
        </CartContext.Provider>
    )

}
// Export to App.jsx
export default cartProvider;
