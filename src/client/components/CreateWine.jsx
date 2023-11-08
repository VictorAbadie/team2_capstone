// NOT TESTED YET//

import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { createWine } from "../../server/db";

//Needed to comment this out for pages to render^^ 


//this componenent allows an admin to add a new wine to the site
const CreateWine = () => {
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [varietal, setVarietal] = useState("");
    const [description, setDescription] = useState("");
    // const [authenticated, setAuthenticated] = useState(false);
    const [success, setSuccess] = useState(false);

    const newWine = async() => {
        e.preventDefault();
    // const token = sessionStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/api/wines', {
         method:'POST',
         headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            type,
            price,
            varietal,
            description
        })
    });
    const result = await response.json();
    setSuccess(result.success);
        console.log(newWine);
        setType("");
        setPrice("");
        setVarietal("");
        setDescription("");
        setSuccess(true);

    } catch (error) {
        console.error(error, error.message);
      }
    };

    return (
    <>
        {success && (
        <p
          style={{
            margin: "2rem auto",
            color: "white",
            fontSize: "3rem",
            backgroundColor: "green",
          }}
        >
          Wine Created!
        </p>
        )}
            <form classname="styleForm">
                <label htmlFor="wineType">
                    <input 
                        id="type"
                        type="text"
                        name="type"
                        placeholder="type"
                        required
                        onChange={(e) => setType(e.target.value)}
                        />
                </label>
                <label htmlFor="winePrice">
                    <input 
                        id="price"
                        type="text"
                        name="price"
                        placeholder="price"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        />
                </label>
                <label htmlFor="wineVarietal">
                    <input 
                        id="varietal"
                        type="text"
                        name="varietal"
                        placeholder="varietal"
                        required
                        onChange={(e) => setVarietal(e.target.value)}
                        />
                </label>
                <label htmlFor="wineDescription">
                    <input 
                        id="description"
                        type="text"
                        name="description"
                        placeholder="description"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        />
                </label>
                <button classname="button"
                        id="create-button"
                        onClick={CreateWine}>
                        Create New Wine!
                </button>
            </form>
          </>
          )}

    export default CreateWine;