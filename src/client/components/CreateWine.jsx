import React, { useState, useEffect } from "react";

const CreateWine = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [varietal, setVarietal] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(""); // New state for image URL
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch isAdmin state from localStorage
    const token = parseInt(localStorage.getItem("token"));
    setIsAdmin(token);
    if (!isNaN(token) && token === 6) {
      // Set the user as admin
      setIsAdmin(true);
    } else {
      // Set the user as non-admin
      setIsAdmin(false);
    }
  }, []);

  const newWine = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      console.log("User is not an admin. Cannot create wine.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/wines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // .trim just removes whitespace from both ends of a string
        body: JSON.stringify({
          type: type.trim(),
          price: parseInt(price),
          varietal: varietal.trim(),
          description: description.trim(),
          img: img.trim(), // Include image URL in the request
        }),
      });

      if (!response.ok) {
        // Log error to console
        console.error("Error creating wine:", response.status, response.statusText);

        // Reset form state
        setSuccess(false);
        return;
      }

      const result = await response.json();
      setSuccess(true);

      // Log success to console
      console.log("Wine Created:", result);

      // Reset form fields after successful creation
      setType("");
      setPrice("");
      setVarietal("");
      setDescription("");
      setImg("");
    } catch (error) {
      // Log unexpected error to console
      console.error("Unexpected error creating wine:", error.message);

      // Reset form state
      setSuccess(false);
    }
  };

  return (
    <>
      {isAdmin ? (
        <>
          <p>{success && "Wine Created!"}</p>

          <form className="styleForm">
            <label htmlFor="wineType">
              <input
                id="type"
                type="text"
                name="type"
                placeholder="Type"
                required
                value={type ?? ""}
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
                value={price ?? ""}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <label htmlFor="wineVarietal">
              <input
                id="varietal"
                type="text"
                name="varietal"
                placeholder="Varietal"
                required
                value={varietal ?? ""}
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
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label htmlFor="wineImg">
              <input
                id="img"
                type="text"
                name="img"
                placeholder="Image URL"
                value={img ?? ""}
                onChange={(e) => setImg(e.target.value)}
              />
            </label>

            <button
              className="button"
              id="create-button"
              onClick={newWine}
            >
              Create New Wine!
            </button>
          </form>
        </>
      ) : (
        <p className="mustBeAdmin">You must be an admin to create a wine.  <a href="/login">Login</a></p>
      )}
    </>
  );
};

export default CreateWine;