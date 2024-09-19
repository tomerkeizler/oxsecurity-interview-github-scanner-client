import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../queries/repository.query";
import { AppContext } from "../App";

const Repositories = () => {
  const { developerToken } = useContext(AppContext);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { developerToken },
    skip: !developerToken,
  });

  const handleSelectRepository = (repositoryName) => {
    navigate(`/repositories/${repositoryName}`);
  };

  if (loading) return <p>Loading repositories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data?.repositories?.map((repo) => {
          const isOxsecurityAssignmentRepo = repo.name
            .toLowerCase()
            .includes("oxsecurity");

          return (
            <li key={repo.name}>
              {isOxsecurityAssignmentRepo ? (
                <strong>{repo.name}</strong>
              ) : (
                repo.name
              )}
              - {repo.size} KB - {repo.owner}
              <button onClick={() => handleSelectRepository(repo.name)}>
                Fetch Details
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Repositories;
