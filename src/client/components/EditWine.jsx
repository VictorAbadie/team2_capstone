// NOT TESTED YET//

import { useState } from "react";

//uses the token to verify admin
const EditWine = async() => {
    e.preventDefault();
//these track the input for each field
const [type, setType] = useState("");
const [price, setPrice] = useState("");
const [varietal, setVarietal] = useState("");
const [description, setDescription] = useState("");
const [success, setSuccess] = useState(false);
// const [authenticated, setAuthenticated] = useState(false);

    try {
        const response = await fetch('http://localhost:3000/api/wines', {
         method:'PATCH',
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
          Wine Updated!
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
                        onClick={handleSubmit}>
                        Update Wine!
                </button>
            </form>
    </>
)
}

export default EditWine;