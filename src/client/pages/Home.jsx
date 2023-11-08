import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ token }) => {
  // state to keep all posts, useful to render all posts
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllWines() {
      const APIResponse = await fetchAllWines();
      console.log(APIResponse);
      if (APIResponse.success) {
        setWines(APIResponse.data.wines);
      } else {
        setError(APIResponse.error.message);
      }
    }
    getAllWines();
  }, []);

  return (
    <>
      {/*conditionally render the errors only if there are errors in state*/}
      {error && <p className="error-notification">{error.message}</p>}
      {/*conditionally render the posts only if there are posts in state*/}

      <div id="searchbar-container">
        <label htmlFor="searchbar">
          Search Posts:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
    </>
  );
};

export default Home;
