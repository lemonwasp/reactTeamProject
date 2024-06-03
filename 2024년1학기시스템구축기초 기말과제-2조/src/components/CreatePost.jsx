import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';
import peopleImage from '../assets/images/people.png';

const CreatePost = () => {
  const navigate = useNavigate();

  const handlePostClick = (event) => {
    event.preventDefault();
    // 여기에 폼 제출 로직을 추가할 수 있습니다.
    navigate('/events-board');
  };

  const handleHeaderClick = () => {
    navigate('/home');
  };

  return (
    <div className="create-post-page">
      <div className="create-post-header" onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
        <h1>
          <img src={peopleImage} alt="Team Logo" className="team-logo" />
          Team Name
        </h1>
      </div>
      <div className="create-post-name">
        <h2>Create Post</h2>
      </div>
      <div className="create-post-container">
        <form className="create-post-form" onSubmit={handlePostClick}>
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
