import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { useNavigate, useLocation } from 'react-router-dom';
import './EventsBoardPage.css';
import eventImage1 from '../assets/images/event1.png';
import eventImage2 from '../assets/images/event2.png';
import eventImage3 from '../assets/images/event3.png';

// 초기 이벤트 데이터 배열
const initialEvents = [
  {
    id: 1,
    title: 'AAAAAAA',
    date: '2024-06-01',
    description: 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    comments: [
      { user: 'User1', date: '2024-06-01', text: 'Comment 1' },
      { user: 'User2', date: '2024-06-01', text: 'Comment 2' },
    ],
  },
  {
    id: 2,
    title: 'BBBB',
    date: '2024-06-10',
    description:
      'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    image: eventImage1,
    comments: [],
  },
  {
    id: 3,
    title: 'CCCCCCCCCCCCC',
    date: '2024-06-20',
    description: 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    image: eventImage2,
    comments: [],
  },
  {
    id: 4,
    title: 'DDDDD',
    date: '2024-06-25',
    description:
      'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    image: eventImage3,
    comments: [],
  },
  {
    id: 5,
    title: 'EEEEEEEEEEEEEEEEEEE',
    date: '2024-07-01',
    description:
      'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    comments: [],
  },
  {
    id: 6,
    title: 'FFF',
    date: '2024-07-05',
    description:
      'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    comments: [],
  },
];

const EventsBoardPage = () => {
  const gridRef = useRef(null); // Masonry 그리드 참조
  const msnry = useRef(null); // Masonry 인스턴스 참조
  const [events, setEvents] = useState(initialEvents); // 이벤트 상태
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, target: null, type: '' }); // 컨텍스트 메뉴 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation(); // 현재 위치 정보 훅

  // Masonry 레이아웃 초기화 및 이미지 로드 후 레이아웃 적용
  useEffect(() => {
    msnry.current = new Masonry(gridRef.current, {
      itemSelector: '.event-card',
      columnWidth: '.event-sizer',
      percentPosition: true,
      gutter: 20,
    });

    imagesLoaded(gridRef.current, () => {
      msnry.current.layout();
    });

    return () => msnry.current.destroy();
  }, []);

  // location.state에 업데이트된 이벤트가 있으면 상태를 업데이트
  useEffect(() => {
    if (location.state && location.state.updatedEvent) {
      const updatedEvent = location.state.updatedEvent;
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event))
      );
    }
  }, [location.state]);

  // Masonry 레이아웃 업데이트
  const handleUpdateLayout = () => {
    if (msnry.current) {
      msnry.current.layout();
    }
  };

  // 컨텍스트 메뉴를 여는 함수
  const handleContextMenu = (event, target, type) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.pageX,
      y: event.pageY,
      target: target,
      type: type,
    });
  };

  // 컨텍스트 메뉴를 닫는 함수
  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, target: null, type: '' });
  };

  // 수정 기능
  const handleEdit = () => {
    if (contextMenu.type === 'event') {
      navigate('/create-post', { state: { event: contextMenu.target } });
    } else if (contextMenu.type === 'comment') {
      const updatedEvents = events.map((event) => ({
        ...event,
        comments: event.comments?.map((comment) =>
          comment === contextMenu.target
            ? { ...comment, text: prompt('Enter new comment', comment.text) || comment.text }
            : comment
        ),
      }));
      setEvents(updatedEvents);
    }
    handleUpdateLayout();
    handleCloseContextMenu();
  };

  // 삭제 기능
  const handleDelete = () => {
    if (contextMenu.type === 'event') {
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
        const updatedEvents = events.filter((event) => event !== contextMenu.target);
        setEvents(updatedEvents);
      }
    } else if (contextMenu.type === 'comment') {
      const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
      if (confirmDelete) {
        const updatedEvents = events.map((event) => ({
          ...event,
          comments: event.comments?.filter((comment) => comment !== contextMenu.target),
        }));
        setEvents(updatedEvents);
      }
    }
    handleUpdateLayout();
    handleCloseContextMenu();
  };

  return (
    <div className="events-board-page" onClick={handleCloseContextMenu}>
      <div className="events-list" ref={gridRef}>
        <div className="event-sizer"></div>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onUpdate={handleUpdateLayout} onContextMenu={handleContextMenu} />
        ))}
      </div>
      {contextMenu.visible && (
        <div className="context-menu" style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

const EventCard = ({ event, onUpdate, onContextMenu }) => {
  const [likes, setLikes] = useState(0); // 좋아요 상태
  const [commentInput, setCommentInput] = useState(''); // 댓글 입력 상태
  const [comments, setComments] = useState(event.comments || []); // 댓글 상태
  const [showAllComments, setShowAllComments] = useState(false); // 댓글 확장 상태

  // 좋아요 클릭 핸들러
  const handleLike = () => {
    setLikes(likes + 1);
  };

  // 댓글 입력 변경 핸들러
  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (commentInput.trim() !== '') {
      const newComment = {
        text: commentInput,
        user: 'User', // 사용자 이름
        date: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setCommentInput('');
      setTimeout(onUpdate, 300);
    }
  };

  // Enter 키를 눌렀을 때 댓글 추가
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  // 댓글 확장/축소 핸들러
  const handleShowComments = () => {
    setShowAllComments(!showAllComments);
    setTimeout(onUpdate, 300);
  };

  // 표시할 댓글 목록 설정
  const commentsToShow = showAllComments ? comments.slice(0, 5) : comments.slice(0, 2);

  return (
    <div
      className={`event-card ${showAllComments ? 'expanded' : ''}`}
      onContextMenu={(e) => onContextMenu(e, event, 'event')}
    >
      <h2>{event.title}</h2>
      <p className="event-date">
        <strong>Date:</strong> {event.date}
      </p>
      {event.image && <img src={event.image} alt={event.title} className="event-image" />}
      <p className="event-description">{event.description}</p>
      <div className="event-actions">
        <button onClick={handleLike} className="like-button">
          ❤️ {likes}
        </button>
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

export default EventsBoardPage;
