import {createContext, useState} from 'react';
import { productsArray, getProductData } from './ productsStore'
import { useEffect } from 'react'

// export gives our application access to this variable
export const CartContext = createContext ({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({children}) {
    // Make a state that is specific to our Provider
    const [cartProducts, setCartProducts] = useState([]);
    // Cart items stored in local storage
    const localCart = localStorage.getItem("cart")
    // Convert local cart items from string to object
    const localObject = JSON.parse(localCart)
    // useEffect should check to see if there is any data in local storage
    useEffect(() => {
    async function getCart(localCart) {
        if (localCart) {
            console.log(localCart);
            console.log(localObject);
            // If cart data is in local storage, set it to a cartproduct
            setCartProducts(localObject);
            return;
        } else {
            return;
        }
    }
    getCart(localCart);
}, []);

    // All we want to store in our cart is the id of and item and the quantity of them added / deleted {id: 1 , quantity: 2} ///// cart products array would look like [ { id: 1 , quantity: 2 }, {id: 2, quantity: 3} ]

    function getProductQuantity(id) {
        // This allows us to loop through our products by id and find their quantity, but if we ask for an ID and we do NOT get an object of data, it will not ask for the quantity. This is in an effort to prevent errors.
       const quantity = cartProducts.find(product => product.id === id)?.quantity;

       localStorage.setItem("cart", JSON.stringify(cartProducts))


        if (quantity === undefined) {
            return 0; 
        }

        // localStorage.setItem("cart", JSON.stringify(cartProducts))

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);
        
        if (quantity === 0) { //product is in the cart}
                setCartProducts(
                    [
                        // Spread operator that takes all of the objects that are already in the cart, move them to the front of this array and then on top of all those products we want to add another one
                        ...cartProducts,
                        {
                            id: id,
                            quantity: 1,
                        }
                    ]
                )

    }   else { //product is not in the cart
        // We are mapping over cart products and we want to add to the product id
        // [ { id: 1 , quantity: 3 }, {id: 2, quantity: 1} ]
        setCartProducts(
            cartProducts.map(
                product =>
                product.id === id                              //if condition
                ? {...product, quantity: product.quantity + 1} //if statement is true
                : product                                      // if statement is false

            )
        )

            }
// Add string version to cart
            localStorage.setItem("cart", JSON.stringify(cartProducts))

    }

    function removeOneFromCart(id) {
        // Get product quantity
        const quantity = getProductQuantity(id);

        // If product = 1, delete all from cart
        if (quantity === 1) {
            deleteFromCart(id);
        } else {
                setCartProducts(
                    // Literally just the reverse logic of adding one to cart from above
                    cartProducts.map(
                        product =>
                        product.id === id                               //if condition
                        ? {...product, quantity: product.quantity - 1 } //if statement is true
                        : product                                       // if statement is false
        
                    )
                )
        }
        localStorage.setItem("cart", JSON.stringify(cartProducts))

    }


    function deleteFromCart(id) {
        //if an object meet a condition, add the object to the array
        // Filter works as so: If I have an array [product1, product2, product3] and I filter product 2, my new array is [product1, product3]
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        // Mapping over Cart Product Array
        cartProducts.map((cartItem) => {
            // Get product data of the cart item by id
            const productData = getProductData(cartItem.id);
            // productData variable gives us access to the item in the cart by id and we then multiply by the quantity of said items and add it to our totalCost variable
            totalCost += (productData.price * cartItem.quantity);
        });
        // Returns our new total cost of items in the cart
        return totalCost;
    }
    
    // We are defining all of our functions and the items as well
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
     }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
// Context (cart, addtoCart, removeCart)
// Provider -> gives your React app access to all the things in your context