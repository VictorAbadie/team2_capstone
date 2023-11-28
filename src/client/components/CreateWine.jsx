// NOT TESTED YET//

import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { createWine } from "../../server/db";

//Needed to comment this out for pages to render^^ 


const CreateWine = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [varietal, setVarietal] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState(null);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        // Fetch isAdmin state from localStorage or sessionStorage, or wherever it is stored
        const token = parseInt(localStorage.getItem('token'));
        setIsAdmin(token);
        if (!isNaN(token) && token === 6) {
            // Set the user as admin
            setIsAdmin(true);
          } else {
            // Set the user as non-admin
            setIsAdmin(false);
          }
      }, []);

      
    const newWine = async() => {
        e.preventDefault();
        if (!isAdmin) {
            console.log("User is not an admin. Cannot create wine.");
            return;
          }
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
            description,
            img
        })
    });
    const result = await response.json();
    setSuccess(result.success);
        console.log(newWine);
        setType("");
        setPrice("");
        setVarietal("");
        setDescription("");
        setImg("")
        setSuccess(true);

    } catch (error) {
        console.error(error, error.message);
      }
    };

    return (
    <>
        {isAdmin ? (
            <>
                {success && (
                    <p> Wine Created! </p>
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
            
                            <label htmlFor="wineImg">
                                <input 
                                    id="img"
                                    type="jpg"
                                    name="img"
                                    placeholder="img"
                                    required
                                    onChange={(e) => setImg(e.target.value)}
                                    />
                            </label>
                            
                            <button classname="button"
                                    id="create-button"
                                    onClick={newWine}>
                                    Create New Wine!
                            </button>
                        </form>
                        </>
        ) : (<p>you must be an admin to create a wine.</p>)}
    </>)
}
    export default CreateWine