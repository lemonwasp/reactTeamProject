import React, { useState, useEffect } from 'react';

const EventCard = ({ event, onUpdate, onContextMenu }) => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(event.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const [userName, setUserName] = useState('');

  const userId = event['user-id'];

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          setUserName(user.name);
        } else {
          console.error('Failed to fetch user name:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, [userId]);

  const userData = JSON.parse(localStorage.getItem('user'));

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  const handleShowComments = () => {
    setShowAllComments(!showAllComments);
    setTimeout(onUpdate, 300);
  };

  const commentsToShow = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className={`event-card ${showAllComments ? 'expanded' : ''}`}>
      <div onContextMenu={(e) => onContextMenu(e, event, 'event')} className="event-details">
        <h2>{event.title}</h2>
        <p className="event-user">{userName}</p> {/* 사용자 이름 표시 */}
        <p className="event-date">
          <strong>Date:</strong> {event.date}
        </p>
        {event.image && <img src={event.image} alt={event.title} className="event-image" />}
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
