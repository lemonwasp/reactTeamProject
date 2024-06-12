import React, { useState } from 'react';

const EventCard = ({ event, onUpdate, onContextMenu }) => {
  const [commentInput, setCommentInput] = useState(''); // 댓글 입력 상태
  const [comments, setComments] = useState(event.comments || []); // 댓글 목록 상태
  const [showAllComments, setShowAllComments] = useState(false); // 댓글 전체 보기 상태

  const userData = JSON.parse(localStorage.getItem('user')); // 로컬 스토리지에서 사용자 데이터 가져오기

  // 댓글 입력 필드 변경 핸들러
  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  // 댓글 추가 함수
  const handleAddComment = async () => {
    if (commentInput.trim() !== '') {
      const newComment = {
        text: commentInput,
        user: userData.name,
        date: new Date().toLocaleString(),
        'user-id': userData['user-id'],
        'board-id': event.id,
      };

      const maxId = comments.reduce((max, comment) => Math.max(max, comment.id), 0);
      newComment.id = (maxId + 1).toString();

      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const savedComment = await response.json();
        setComments([...comments, savedComment]);
        setCommentInput('');
        setTimeout(onUpdate, 300);
      } else {
        console.error('Failed to save comment');
      }
    }
  };

  // 엔터 키 입력 시 댓글 추가 함수 호출
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  // 댓글 전체 보기 토글 함수
  const handleShowComments = () => {
    setShowAllComments(!showAllComments);
    setTimeout(onUpdate, 300);
  };

  const commentsToShow = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className={`event-card ${showAllComments ? 'expanded' : ''}`}>
      <div onContextMenu={(e) => onContextMenu(e, event, 'event')} className="event-details">
        <h2>{event.title}</h2>
        <p className="event-date">
          <strong>Date:</strong> {event.date}
        </p>
        <p className="event-description">
          {event.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <div className="event-actions">
        <input
          type="text"
          placeholder="Add a comment"
          value={commentInput}
          onChange={handleCommentChange}
          onKeyPress={handleKeyPress}
          className="comment-input"
        />
        <button onClick={handleAddComment} className="add-comment-button">
          Add
        </button>
      </div>
      <div className="comments-section">
        <div className={`comments-list ${showAllComments ? 'expanded' : ''}`}>
          {commentsToShow.map((comment, index) => (
            <div key={index} className="comment" onContextMenu={(e) => onContextMenu(e, comment, 'comment')}>
              <p>
                <strong>{comment.user}</strong> ({comment.date}):
              </p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
        {comments.length > 2 && (
          <button onClick={handleShowComments} className="show-comments-button">
            {showAllComments ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
