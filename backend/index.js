const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

const GITHUB_API_URL = 'https://api.github.com';

const logRateLimitHeaders = (headers) => {
  console.log('Rate Limit:', headers['x-ratelimit-limit']);
  console.log('Rate Limit Remaining:', headers['x-ratelimit-remaining']);
  console.log('Rate Limit Reset:', new Date(headers['x-ratelimit-reset'] * 1000).toLocaleTimeString());
};

const handleGitHubApiError = (error, res) => {
  if (error.response) {
    logRateLimitHeaders(error.response.headers);
    if (error.response.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
      return res.status(403).json({ error: 'GitHub API rate limit exceeded. Please try again later.' });
    }
  }
  return res.status(500).json({ error: 'Failed to fetch data from GitHub' });
};

app.get('/api/search/repositories', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, { params: { q } });
    logRateLimitHeaders(response.headers);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching repository search data:', error.message);
    handleGitHubApiError(error, res);
  }
});

app.get('/api/repositories/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}`);
    logRateLimitHeaders(response.headers);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching repository details for ${owner}/${repo}:`, error.message);
    handleGitHubApiError(error, res);
  }
});

app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    logRateLimitHeaders(response.headers);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching user profile for ${username}:`, error.message);
    handleGitHubApiError(error, res);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
