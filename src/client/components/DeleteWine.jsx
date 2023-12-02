import { useState, useEffect } from "react";

const DeleteWine = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [wineId, setWineId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch isAdmin state from localStorage or sessionStorage, or wherever it is stored
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

  const handleDeleteWine = async () => {
    if (!wineId) {
      console.error("Please enter a valid wine ID.");
      setError("Please enter a valid wine ID.");
      return;
    }

    const id = parseInt(wineId);

    if (isNaN(id) || id < 1 || id > 16) {
      console.error("Please enter a valid wine ID between 1 and 16.");
      setError("Please enter a valid wine ID between 1 and 16.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/wines/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      // Handle success or additional actions after deletion
      setError(null);
    } catch (error) {
      console.error("Error deleting wine:", error.message);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {isAdmin ? (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label className="mustBeAdmin" htmlFor="wineId">
            Select Wine ID (1-16):
            <input
              id="wineId"
              type="number"
              name="wineId"
              placeholder="Enter Wine ID"
              required
              value={wineId}
              onChange={(e) => setWineId(e.target.value)}
            />
          </label>
          <button className="button" onClick={handleDeleteWine}>
            Delete Wine
          </button>
        </>
      ) : (
        <p className="mustBeAdmin">You must be an admin to delete Wines.  <a href="/login">Login</a></p>
      )}
    </>
  );
};

export default DeleteWine;