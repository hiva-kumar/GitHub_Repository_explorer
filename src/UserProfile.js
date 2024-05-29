// src/UserProfile.js
import React from 'react';

const UserProfile = ({ profile }) => {
  return (
    <div>
      <h2>{profile.login}</h2>
      <img src={profile.avatar_url} alt={profile.login} width="100" />
      <p>{profile.bio}</p>
      <p>Followers: {profile.followers}</p>
      <p>Following: {profile.following}</p>
      <p>Public Repos: {profile.public_repos}</p>
    </div>
  );
};

export default UserProfile;
