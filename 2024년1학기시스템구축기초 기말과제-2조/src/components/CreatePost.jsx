import React from 'react';
import './CreatePost.css';
import peopleImage from '../assets/images/people.png';

const CreatePost = () => {
  return (
    <div className="create-post-page">
      <div className="create-post-header">
        <h1>
          <img src={peopleImage} alt="Team Logo" className="team-logo" />
          Team Name
        </h1>
      </div>
      <div className="create-post-name">
        <h2>Create Post</h2>
      </div>
      <div className="create-post-container">
        <form className="create-post-form">
          <label>
            Date
            <input type="date" name="date" required />
          </label>
          <label>
            Post Title
            <input type="text" name="title" required />
          </label>
          <label>
            Description
            <textarea name="description" rows="5" required></textarea>
          </label>
          <label>
            File Upload
            <input type="file" name="file" />
          </label>
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
