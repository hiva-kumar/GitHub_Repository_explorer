import React, { useState } from 'react';
import axios from 'axios';
import RepositoryList from './RepositoryList';
import RepositoryDetails from './RepositoryDetails';
import UserProfile from './UserProfile';

const App = () => {
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');

  const searchRepositories = async () => {
    setError('');
    try {
      const response = await axios.get(`/api/search/repositories?q=${query}`);
      setRepositories(response.data.items);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('GitHub API rate limit exceeded. Please try again later.');
      } else {
        setError('Failed to fetch data from GitHub');
      }
      console.error(error);
    }
  };

  const fetchRepositoryDetails = async (owner, repo) => {
    setError('');
    try {
      const response = await axios.get(`/api/repositories/${owner}/${repo}`);
      setSelectedRepo(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('GitHub API rate limit exceeded. Please try again later.');
      } else {
        setError('Failed to fetch data from GitHub');
      }
      console.error(error);
    }
  };

  const fetchUserProfile = async (username) => {
    setError('');
    try {
      const response = await axios.get(`/api/users/${username}`);
      setUserProfile(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('GitHub API rate limit exceeded. Please try again later.');
      } else {
        setError('Failed to fetch data from GitHub');
      }
      console.error(error);
    }
  };

  return (
    <div>
      <h1>GitHub Explorer</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search repositories"
      />
      <button onClick={searchRepositories}>Search</button>
      <RepositoryList repositories={repositories} onSelect={fetchRepositoryDetails} />
      {selectedRepo && <RepositoryDetails repo={selectedRepo} onUserClick={fetchUserProfile} />}
      {userProfile && <UserProfile profile={userProfile} />}
    </div>
  );
};

export default App;
