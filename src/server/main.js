require('dotenv').config()

const express = require('express');
const router = require('vite-express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static('public'))

const db = require('./db/client')
db.connect()

const apiRouter = require('./api');
app.use('/api', apiRouter);

router.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);

var cors = require("cors")
const stripe = require("stripe")("sk_test_51OD9blCR2R1tfU0OdhRIr41Il5SgJwpSEBK5OaW9hKrQbFBH1dMtf7327Q0Tfy5LSEJAXLSfsjdxJzFWFPOuY7Dn00H19mjeao")
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Sending a post request to our /checkout route
app.post("/checkout", async (req , res) => {
    
    // This is the way that our data is shown
    // req.body.items
    // [
    //     {
    //         id:1,
    //         quantity: 3
    //     }
    // ]

    // This is the way that stripe wants to see the data (annoying)
    // stripe wants
    // [
    //     {
    //         price:1,
    //         quantity:3
    //     }
    // ]
    console.log(req.body);

    // Takes posted data from the user here
    const items = req.body.items;

    // Format line items to stripe format
    let lineItems=[];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.stripe_id,
                quantity: item.quantity
            }
        )
    });

    // Create a session with the line items from above
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        // Make a payment session
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    // When session is fully created, will send the created session URL to the front end so user can checkout with stripe (Follow logic back to Navbar.js)
    res.send(JSON.stringify({
        url: session.url
    }));

});

app.listen(4000, () => console.log("Listening on port 3000"));

module.exports = router;