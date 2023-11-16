
import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailedWine = () => {
    const {id} = useParams();
    const [singleWine, setSingleWine] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        async function getSingleWineById() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/wines/${id}/`
            );
            const result = await response.json();
        setSingleWine(result);
        } catch (error) {
            setError(error);
        }
    }
    getSingleWineById();
}, [])

return (
    <>
        <div className="singleWineContainer"> 
            <h2 className="detailsCard">
                <img id="img" src={singleWine.img}></img>
                {singleWine.type}
                {singleWine.price}
                {singleWine.varietal}
                {singleWine.description}
            </h2>
        </div>
    </>
)
}

export default DetailedWine