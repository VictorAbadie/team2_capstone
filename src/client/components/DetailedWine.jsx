// // NOT TESTED YET//

// import {useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getWineById } from "src/server/api/wines.js";

// export default function DetailedWine() {
//     //grab wineId from URL
//     const wineId = useParams();
    
//     //grab user token from session storage
//     const token = sessionStorage.getItem("token");
    
//     //will store the wine matching the url id
//     const [singleWine, setSingleWine] = useState([]);
    
//     //will store any errors
//     const [error, setError] = useState(null);
    
//     //navigates back home
//     const navigate = useNavigate();

//     /*
//     Upon page load, fetch all wines, then filter out 
//     all wines except the one whose id matches the url,
//     Set that wine to singleWine, and later map over it to render the 
//     full wine
//   */

//     useEffect(() => {
//         async function gettingWineById(token) {
//         const APIResponse = await getWineById(token);
//         if (APIResponse.success) {
//             const thisWine = APIResponse.data.wines.filter((wine) => {
//                 return wine._id === wineId.id;
//             })
//         setSingleWine(thisWine);
//         return
//         }
//         setError(APIResponse.error.message);
//         console.log("error!");
//     }
//     gettingWineById(token);
// }, [wineId]);

// return (
//     <>
//         <div>
//             <h2 className="singleWine">{wines.type}</h2>
//             <h2 className="singleWine">{wines.price}</h2>
//             <h2 className="singleWine">{wines.varietal}</h2>
//             <h2 className="singleWine">{wines.description}</h2>
//             <h2 className="singleWine">{wines.img}</h2>

//             <button className="button" 
//             onClick={() => { navigate("/"); }}>
//           Back to All Wines
//             </button>
//         </div>

    
//     </>
// )
// }
