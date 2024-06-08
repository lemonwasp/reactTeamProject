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
  const [id, setId] = useState(null); // ID 상태

  // location.state에 기존 이벤트 정보가 있으면 상태를 업데이트
  useEffect(() => {
    if (location.state && location.state.event) {
      const { event } = location.state;
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setId(event.id);
    }
  }, [location.state]);

  const handlePostClick = async (event) => {
    event.preventDefault();
    const newEvent = {
      id,
      title,
      description,
      date,
    };

    if (id) {
      // 기존 게시글 수정 (PUT 요청)
      await fetch(`http://localhost:3001/boards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
    } else {
      // 새로운 게시글 추가 (POST 요청)
      // 먼저 현재 존재하는 모든 게시글을 가져와서 최대 id를 찾습니다.
      const response = await fetch('http://localhost:3001/boards');
      const boards = await response.json();
      const maxId = boards.reduce((max, board) => Math.max(max, board.id), 0);
      newEvent.id = (maxId + 1).toString();
      await fetch('http://localhost:3001/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
    }

    // 게시글 업데이트 로직 추가
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
