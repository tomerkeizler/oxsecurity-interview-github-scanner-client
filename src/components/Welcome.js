import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const Welcome = () => {
  const { developerToken, setDeveloperToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmitDeveloperToken = () => {
    navigate("/repositories");
  };

  return (
    <>
      <h1>GitHub Scanner</h1>
      <input
        type="text"
        placeholder="Enter GitHub Developer Token"
        value={developerToken}
        onChange={(e) => setDeveloperToken(e.target.value)}
      />
      <button onClick={handleSubmitDeveloperToken}>Fetch Repositories</button>
    </>
  );
};

export default Welcome;
