import React, { useState, useEffect } from "react";

const EditWine = () => {
  const [wineId, setWineId] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [varietal, setVarietal] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const token = parseInt(localStorage.getItem("token"));
    setIsAdmin(token);
    if (!isNaN(token) && token === 6) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const fetchWineDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/wines/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const wineDetails = result; // Adjust this based on the actual structure of your response

      setType(wineDetails.type);
      setPrice(wineDetails.price);
      setVarietal(wineDetails.varietal);
      setDescription(wineDetails.description);
    } catch (error) {
      console.error("Error fetching wine details:", error.message);
    }
  };

  const handleEditWine = async () => {
    if (!wineId) {
      console.error("Please enter a valid wine ID.");
      return;
    }

    const id = parseInt(wineId);

    if (isNaN(id) || id < 1 || id > 16) {
      console.error("Please enter a valid wine ID between 1 and 16.");
      return;
    }

    try {
      await fetchWineDetails(id);
    } catch (error) {
      console.error("Error fetching wine details:", error.message);
      return;
    }

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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(true);
      console.log(result);
    } catch (error) {
      console.error("Error updating wine:", error.message);
    }
  };

  return (
    <>
      {isAdmin ? (
        <>
          <p>{success && "Wine Updated!"}</p>
          <form className="styleForm">
            <label htmlFor="wineId">
              Wine ID:
              <input
                id="wineId"
                type="text"
                name="wineId"
                placeholder="Enter Wine ID"
                required
                value={wineId}
                onChange={(e) => setWineId(e.target.value)}
              />
            </label>
            <label htmlFor="wineType">
              <input
                id="type"
                type="text"
                name="type"
                placeholder="Type"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </label>
            <label htmlFor="winePrice">
              <input
                id="price"
                type="number"
                name="price"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
            </label>
            <label htmlFor="wineVarietal">
              <input
                id="varietal"
                type="text"
                name="varietal"
                placeholder="Varietal"
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
                placeholder="Description"
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
      ) : (
        <p className="mustBeAdmin">You must be an admin to edit Wines. <a href="/login">Login</a></p>
      )}
    </>
  );
};

export default EditWine;