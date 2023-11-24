import { useEffect } from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";

export default function GetUserId({ token }) {
  useEffect(() => {
    async function admin() {
      try {
        // Get token from local storage
        const storedToken = localStorage.getItem("token");
        console.log("Stored Token:", storedToken);


        if (!storedToken) {
          console.error("Token not found in local storage. Redirecting to login.");
          // Redirect to login if token is not present

          // <Navigate to="/login"/>
          
        }

        // Use the stored token in the fetch request
        // const usersId = await fetch(`http://localhost:3000/api/users/6`, {
        //   headers: {
        //     Authorization: `Bearer ${storedToken}`,
        //   },
        // });

        // if (storedToken === 6) {
        //   <Outlet/>
        // } else {
        //   <Navigate to='/login'/>
        // }


         
        

        // if (!usersId.ok) {
        //   console.error(`Error fetching user data. Status: ${usersId.status}`);
        //   // Handle the error, you might want to redirect to login or show an error message

        //   // <Navigate to="/login" />
        //   return 
        // }

        // const data = await usersId.json();
        // console.log("User data:", data);

        // if (!data) {
        //   console.warn("No data found. Redirecting to login.");
        //   // Redirect to login if data is not present

        //   // <Navigate to="/login" />
        //   return 
        // }

        // Redirect to '/createwine' if the data is present
        // console.log("Redirecting to /createwine");
        // return <Navigate to="/createwine" />;
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }

    admin();
  }, [token]);

  return <>
      
  </>;
}
