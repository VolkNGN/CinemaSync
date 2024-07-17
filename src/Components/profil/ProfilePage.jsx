// src/Components/profil/ProfilePage.jsx
import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1>Mon profil</h1>
      <div className="profile-section">
        <h2>Editer mon profil</h2>
        <div className="profile-info">
          <div className="profile-pic">
            <img src="https://via.placeholder.com/100" alt="Profile" />
            <div className="edit-icon">✎</div>
          </div>
          <div className="profile-details">
            <input type="text" value="Nom" readOnly />
            <input type="email" value="E-mail" readOnly />
          </div>
        </div>
        <div className="profile-settings">
          <h3>Editer mes préférences</h3>
          <button>Langue</button>
          <button>Mot de passe</button>
          <button>Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
