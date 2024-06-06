import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreatePost.css';
import peopleImage from '../assets/images/people.png';

const CreatePost = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation(); // 현재 위치 정보 훅
  const [title, setTitle] = useState(''); // 제목 상태
  const [description, setDescription] = useState(''); // 설명 상태
  const [date, setDate] = useState(''); // 날짜 상태

  // location.state에 기존 이벤트 정보가 있으면 상태를 업데이트
  useEffect(() => {
    if (location.state && location.state.event) {
      const { event } = location.state;
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
    }
  }, [location.state]);

  const handlePostClick = (event) => {
    event.preventDefault();
    const updatedEvent = {
      ...location.state.event,
      title,
      description,
      date,
    };
    // 게시글 업데이트 로직 추가
    navigate('/events-board', { state: { updatedEvent } });
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
        <h2>{location.state && location.state.event ? 'Edit Post' : 'Create Post'}</h2>
      </div>
      <div className="create-post-container">
        <form className="create-post-form" onSubmit={handlePostClick}>
          <label>
            Date
            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label>
            Post Title
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description
            <textarea
              name="description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>
          <button type="submit">{location.state && location.state.event ? 'Update' : 'Post'}</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
