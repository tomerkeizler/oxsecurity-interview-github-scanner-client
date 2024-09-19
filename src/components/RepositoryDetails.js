import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_REPOSITORY_DETAILS } from "../queries/repository.query";
import { AppContext } from "../App";

const RepositoryDetails = () => {
  const { developerToken } = useContext(AppContext);
  const { repo_name: repoName } = useParams();
  const [getRepository, { loading, error, data }] = useLazyQuery(
    GET_REPOSITORY_DETAILS
  );

  useEffect(() => {
    if (repoName) {
      getRepository({ variables: { developerToken, repoName } });
    }
  }, [repoName, getRepository, developerToken]);

  if (loading) return <p>Loading repository details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const details = data?.repository;

  return (
    details && (
      <div>
        <h2>Details for {details.name}</h2>

        <p>Name: {details.name}</p>
        <p>Size: {details.size} KB</p>
        <p>Owner: {details.owner}</p>
        <p>Private: {details.isPrivate ? "Yes" : "No"}</p>
        <p>Number of files: {details.numberOfFiles}</p>

        <p>random YAML file content:</p>
        <code>
          {details.randomYamlFileContent
            ? details.randomYamlFileContent
            : "None"}
        </code>

        <p>Webhooks:</p>
        {details?.webhooks.length > 0 ? (
          <ul>
            {details.webhooks.map((webhook) => (
              <li key={webhook}>{webhook}</li>
            ))}
          </ul>
        ) : (
          "None"
        )}
      </div>
    )
  );
};

export default RepositoryDetails;
