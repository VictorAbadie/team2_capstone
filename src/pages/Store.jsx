import {Row, Col} from 'react-bootstrap';
// This gives us access to the productsArray in our productsStore.js
import { productsArray } from '../productsStore';
import ProductCard from '../components/ProductCard';




function Store() {
    return (
        <>
        {/* align="center is adjusting the header of the store to the center of the page and the className="p-3" is responsible for the padding between the header and the items */}
        <h1 align="center" className="p-3">Welcome to the Store!</h1>
        {/* We're using rows and colums to align the products on our site. on xs screens, it'll show one column / row and on larger screens, 3 */}
        <Row xs={1} md={3} className="g-4">
            {/*Allows us to go through every element in the array and then allows us to specific logic based of the element that we're at but most importantly, allows us to return react.jsx for a certain element  */}
            {productsArray.map((product, idx) => (
                // key={idx} gives specific keys to our columns and is best react practice
                            <Col align="center" key={idx}>
                                {/* The first "product" defines the property and the second "product" looks at the product that we're mapping over //// we are able to access the product= because in our ProductCard.js, we have the variable product = props.product  */}
                            <ProductCard product={product}/>
                        </Col>
            ))}




        </Row>
        </>
    )
}

export default Store;