// src/RepositoryList.js
import React from 'react';

const RepositoryList = ({ repositories, onSelect }) => {
  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id} onClick={() => onSelect(repo.owner.login, repo.name)}>
          {repo.full_name}
        </li>
      ))}
    </ul>
  );
};

export default RepositoryList;
