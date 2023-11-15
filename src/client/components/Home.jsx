import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import AllWines from './AllWines';

const Home = () => {  
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null);
console.log(wines)
  const navigate = useNavigate();

  useEffect(() => {

    async function fetchAllWines() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/wines`
        );
      const result = await response.json();
        setWines(result);
      } catch (error) {
          setError(error);
      }
    }
    fetchAllWines();
  }, []);

  return (
    <>
        <div id="all-wines-container" key={wines.id}>
          {!error &&
              wines.map((wine) => {
                return <>
                  <p >{wine.varietal}</p>
                  <p >{wine.price}</p>
                  <img src={wine.img}></img>
                  <button id="details-button"> See Details </button>
                </>
  })}


        </div>
  </>

  )}
  
export default Home
