// import { useNavigate } from "react-router-dom";

// const RedWines = () => {
//     const navigate = useNavigate();
    
//     // useEffect(() => {
//     //     async function getReds() {
//     //         const APIResponse = await 
//     //     }
//     // })
//     const response = await fetch('http://localhost:3000/api/wines');
//     const redRender = response.map(wines); {
//         console.log(response)
//         if ((wines.type === "red")) {

//             return (
//                 <div id="red-wine">
//                     <img src="client/photos/red_wine.jpg" ></img>
//                     <h2 className="singleWine">{wines.varietal}</h2>
//                     <h2 className="singleWine">{wines.price}</h2>
                            
//                     <button
//                         className="button"
//                         id="details-button"
//                         onClick={() => {
//         //when clicked, take user to detailed wine view
//         //which will use useParams to render the wine
//                         navigate(`/${wines._id}`);
//                     }}>
//                         See Details
//                     </button>
                
//                 </div>
//     )}
// }
    
//     redRender()
// }

// export default RedWines