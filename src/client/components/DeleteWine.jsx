// NOT TESTED YET//

import { useNavigate, useParams } from "react-router-dom";

const DeleteWine() => {
    async function handleDelete() {
        const navigate = useNavigate();
        const wineId = useParams();
        const token = sessionStorage.getItem("token");
      try {
        const result = await DeleteWine(wineId);
        console.log(result);
        if (token) {
            navigate("/")
      }} catch (error) {
        console.error(error);
      }
    };

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