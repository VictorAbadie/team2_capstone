// NOT TESTED YET//

import { useNavigate } from "react-router-dom";

const DeleteWine = async() => {
    e.preventDefault();
    const [admin, setAdmin] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate();
    // const token = sessionStorage.getItem("token");

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
        { admin && (
            <button className="button" 
                onClick={handleDelete}>
                Delete Wine
            </button>
        )}
        </>
    )
}

export default DeleteWine;