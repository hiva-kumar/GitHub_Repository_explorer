// src/RepositoryDetails.js
import React from 'react';

const RepositoryDetails = ({ repo, onUserClick }) => {
  return (
    <div>
      <h2>{repo.full_name}</h2>
      <p>{repo.description}</p>
      <p>Created at: {new Date(repo.created_at).toLocaleDateString()}</p>
      <p>
        Owner: <span onClick={() => onUserClick(repo.owner.login)}>{repo.owner.login}</span>
      </p>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks_count}</p>
      <p>Open Issues: {repo.open_issues_count}</p>
    </div>
  );
};

export default RepositoryDetails;
