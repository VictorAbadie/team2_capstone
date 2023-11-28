import React, { useState, useEffect } from 'react';



const SetAdminFunction = ({isAdmin, setIsAdmin}) => {
  // State to store the user role
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Function to check and set admin based on token
    const setAdmin = () => {
      try {
        // Retrieve the token from local storage and parse it as an integer
        const token = parseInt(localStorage.getItem('token'));

        // Log the retrieved token for debugging
        console.log('Retrieved token:', token);

        // Check if the token is a number and has a length of 6
        if (!isNaN(token) && token === 6) {
          // Set the user as admin
          setIsAdmin(true);
        } else {
          // Set the user as non-admin
          setIsAdmin(false);
        }
      } catch (error) {
        // Log any errors that occur during token retrieval or parsing
        console.error('Error while processing token:', error);
        // Set the user as non-admin in case of an error
        setIsAdmin(false);
      }
    };

    // Call the setAdmin function when the component mounts
    setAdmin();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return isAdmin ? (
    <div>{/* Render the content for admin users */}<p>hello admin</p></div>
  ) : (
    // <Navigate to="/login" />
    <p>youre not an admin, please <a href="/login">login</a></p>
  );
};

export default SetAdminFunction;
