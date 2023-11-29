import React, { useState, useEffect } from "react";

const EditWine = ({ id }) => {
  // State to track input for each field
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [varietal, setVarietal] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch isAdmin state from localStorage or sessionStorage, or wherever it is stored
//     const token = parseInt(localStorage.getItem("token"));
//     setIsAdmin(token);
//     if (!isNaN(token) && token === 6) {
//       // Set the user as admin
//       setIsAdmin(true);
//     } else {
//       // Set the user as non-admin
//       setIsAdmin(false);
//     }
//   }, []);

  const handleEditWine = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/wines/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          price,
          varietal,
          description,
        }),
      });

      // Check if the response status is in the range of 200 to 299
      if (!response.ok) {
        // If not, throw an error with the response status text
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(result.success);
      setError(null); // Clear any previous error
      console.log(result);

      // Reset form fields and set success state
      setType("");
      setPrice("");
      setVarietal("");
      setDescription("");
      setSuccess(true);

    } catch (error) {
      console.error(error.message);
      setError("An error occurred. Please try again."); // Set a user-friendly error message
    }
  };

  return (
    <>
      {/* {isAdmin ? ( */}
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>Wine Updated!</p>
          <form className="styleForm">
            <label htmlFor="wineType">
              <input
                id="type"
                type="text"
                name="type"
                placeholder="type"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </label>

            <label htmlFor="winePrice">
              <input
                id="price"
                type="text"
                name="price"
                placeholder="price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <label htmlFor="wineVarietal">
              <input
                id="varietal"
                type="text"
                name="varietal"
                placeholder="varietal"
                required
                value={varietal}
                onChange={(e) => setVarietal(e.target.value)}
              />
            </label>

            <label htmlFor="wineDescription">
              <input
                id="description"
                type="text"
                name="description"
                placeholder="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <button className="button" onClick={handleEditWine}>
              Update Wine!
            </button>
          </form>
        </>
      {/* ) : (
        <p>You must be an admin to edit Wines.</p>
      )} */}
    </>
  );
};

export default EditWine;
