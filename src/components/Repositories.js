import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../queries/repository.query";
import { AppContext } from "../App";
import "./Repositories.css";

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
      <table className="repositories-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Owner</th>
          </tr>
        </thead>

        <tbody>
          {data?.repositories?.map((repo) => {
            const isOxsecurityAssignmentRepo = repo.name
              .toLowerCase()
              .includes("oxsecurity");

            return (
              <tr
                key={repo.name}
                onClick={() => handleSelectRepository(repo.name)}
                className="clickable-row"
              >
                <td>
                  {isOxsecurityAssignmentRepo ? (
                    <strong>{repo.name}</strong>
                  ) : (
                    repo.name
                  )}
                </td>
                <td>{repo.size}</td>
                <td>{repo.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Repositories;
