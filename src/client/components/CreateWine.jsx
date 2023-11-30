import { useState, useEffect } from "react";
import { makeWine } from '../fetches';
// import { useNavigate, useParams } from "react-router-dom";

//once admin privileges exist pass {token} to CreateWine
    const CreateWine = () => {
        // const [isAdmin, setIsAdmin] = useState(false);
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
      

    const handleWine = async(e) => {
        e.preventDefault();
        // const token = localStorage.getItem("token");
            try {
                const wineObject = {
                    type: type,
                    price: price,
                    varietal: varietal,
                    description: description,
                };
        // once admin privileges are established also pass token to newWine w wineObject
        const newWine = await makeWine (wineObject);
        console.log(newWine);
            if(newWine.success) {
                setType(" ");
                setPrice(null);
                setVarietal(" ");
                setDescription(" ");
                setSuccess(true);
            } else {
                alert("Error creating wine!");
            }
            return newWine;
        } catch (error) {
            console.error(error, error.message);
        }
    
    return (
        <>
        { success && (
            <>
        <form className="styleForm"
        onSubmit={handleWine}>
            <label htmlFor="wineType">Wine Type:
                <input 
                    id="type"
                    type="text"
                    name="type"
                    required
                    onChange={(e) => setType(e.target.value)}
            /></label>
                        
            <label htmlFor="winePrice">Wine Price:
                <input 
                    id="price"
                    type="text"
                    name="price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
            /></label>
            
            <label htmlFor="wineVarietal">Wine Varietal:
                <input 
                    id="varietal"
                    type="text"
                    name="varietal"
                    required
                    onChange={(e) => setVarietal(e.target.value)}
            /></label>
            
            <label htmlFor="wineDescription">Wine Description:
                <input 
                    id="description"
                    type="text"
                    name="description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
            /></label>

            <button className="button"
                id="create-button"
                onClick={handleWine}>
                Create New Wine!
            </button>
        </form>
            </>
        )};
    </>
)};
}

export default CreateWine;