// NOT TESTED YET//

import { useNavigate } from "react-router-dom";

const DeleteWine = async() => {
    e.preventDefault();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    try {
    const response = await fetch('http://localhost:3000/api/wines', {
     method:'DELETE',
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
        console.log(result);
        if (token) {
            navigate("/")
      }} catch (error) {
        console.error(error);
      }

    return (
        <>
        <button className="button"
                id="delete-button" 
                onClick={handleDelete}>
          Delete Wine
        </button>
        </>
    )
}

export default DeleteWine;