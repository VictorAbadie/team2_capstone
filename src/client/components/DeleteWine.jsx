import { useState, useEffect } from "react";

const DeleteWine = async() => {
    const [isAdmin, setIsAdmin] = useState(false);
    console.log(isAdmin);
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

    try {
    const response = await fetch('http://localhost:3000/api/wines/:id', {
     method:'DELETE',
     headers: {
        'Content-Type' : 'application/json',
    },
    // body: JSON.stringify({
    //     type,
    //     price,
    //     varietal,
    //     description
    // })
});
        const result = await response.json();
        console.log(result);
        return result
       } catch (error) {
        console.error(error);
      }

    return (
        <>
        { isAdmin ? (
            <>
            <button className="button" 
                onClick={DeleteWine}>
                Delete Wine
            </button>
        </>) : (<p>You must be an admin to delete wines.</p>)}
        </>
    )
}

export default DeleteWine