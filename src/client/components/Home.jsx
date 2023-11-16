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
        <div id="allWinesCard" key={wines.id}>
          {!error &&
              wines.map((wine) => {
                return <>
                  <div className="wineCard">
                    <p className="wineFacts">{wine.varietal}</p>
                    <p className="wineFacts">{wine.price}</p>
                    <img id="img" src={wine.img}></img>
                    <button className="button"> See Details </button>
                  </div>
                </>
  })}
        </div>
  </>

  )}
  
export default Home
