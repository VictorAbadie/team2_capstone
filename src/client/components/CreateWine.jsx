import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

const CreateWine = () => {
    //if CreateWine functionality is only available to admin, so I set its initial state
    //to true - I think this eliminates the necessity for the useEffect function
    //as the user is already an admin in order to get to this screen
    const [isAdmin, setIsAdmin] = useState(true);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [varietal, setVarietal] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState(false);
    //also removed the img here and below - getting an image added will be a t2 goal

    // useEffect(() => {
    //     // Fetch isAdmin state from localStorage
    //     const token = parseInt(localStorage.getItem('token'));
    //     setIsAdmin(token);
    //     if (!isNaN(token) && token === 6) {
    //         // Set the user as admin
    //         setIsAdmin(true);
    //       } else {
    //         // Set the user as non-admin
    //         setIsAdmin(false);
    //       }
    //   }, []);
      
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
            description
    //removed img here
        })
    });
    const result = await response.json();
    setSuccess(result.success);
        console.log(newWine);
        setType("");
        setPrice("");
        setVarietal("");
        setDescription("");
        //removed img here
        setSuccess(true);

    } catch (error) {
        console.error(error, error.message);
      }
    };
    
    return (
        <>
        { success ? (
            <>
    {/* //if success, return the form */}
             <p> Wine Created! </p>
                
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

        {/* //removed the img label and input */}

                        <button classname="button"
                                id="create-button"
                                onClick={newWine}>
                                Create New Wine!
                        </button>
                    </form>
                </>
        {/* //if you got to this page despite being just a user (sneaky devil)
        //the following p tag displays: */}

        ) : (<p>you must be an admin to create a wine.</p>)}
    </>)
}

    export default CreateWine