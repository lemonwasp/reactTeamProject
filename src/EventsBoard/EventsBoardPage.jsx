import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { useNavigate, useLocation } from 'react-router-dom';
import EventCard from './EventCard';
import './EventsBoardPage.css';

const EventsBoardPage = () => {
  const gridRef = useRef(null);
  const msnry = useRef(null);
  const [events, setEvents] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, target: null, type: '' });
  const navigate = useNavigate();
  const location = useLocation();

  const getData = async () => {
    const eventsRes = await fetch('http://localhost:3001/boards').then((res) => res.json());
    const commentsRes = await fetch('http://localhost:3001/comments').then((res) => res.json());

    const eventsWithComments = eventsRes.map((event) => ({
      ...event,
      comments: commentsRes.filter((comment) => comment['board-id'] === event.id),
    }));

    setEvents(eventsWithComments);

    msnry.current = new Masonry(gridRef.current, {
      itemSelector: '.event-card',
      columnWidth: '.event-sizer',
      percentPosition: true,
      gutter: 20,
    });
  };

  useEffect(() => {
    imagesLoaded(gridRef.current, () => {
      if (msnry.current) {
        msnry.current.layout();
      }
    });
  }, [events]);

  useEffect(() => {
    getData();
    return () => {
      if (msnry.current) {
        msnry.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (location.state && location.state.updatedEvent) {
      const updatedEvent = location.state.updatedEvent;
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event))
      );
    }
  }, [location.state]);

  const handleUpdateLayout = () => {
    if (msnry.current) {
      msnry.current.layout();
    }
  };

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

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, target: null, type: '' });
  };

  const handleEdit = async () => {
    if (contextMenu.type === 'event') {
      navigate('/create-post', { state: { event: contextMenu.target } });
    } else if (contextMenu.type === 'comment') {
      const updatedText = prompt('댓글을 수정하세요', contextMenu.target.text);
      if (updatedText !== null) {
        const updatedComment = { ...contextMenu.target, text: updatedText };
        const response = await fetch(`http://localhost:3001/comments/${contextMenu.target.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedComment),
        });

        if (response.ok) {
          const updatedEvents = events.map((event) => ({
            ...event,
            comments: event.comments.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)),
          }));
          setEvents(updatedEvents);
        } else {
          console.error('Failed to update comment');
        }
      }
    }
    handleCloseContextMenu();
    handleUpdateLayout();
  };

  const handleDelete = async () => {
    try {
      if (contextMenu.type === 'event') {
        const confirmDelete = window.confirm('이 게시글을 삭제하시겠습니까?');
        if (confirmDelete) {
          const response = await fetch(`http://localhost:3001/boards/${contextMenu.target.id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete the event');
          const updatedEvents = events.filter((event) => event.id !== contextMenu.target.id);
          setEvents(updatedEvents);
        }
      } else if (contextMenu.type === 'comment') {
        const confirmDelete = window.confirm('이 댓글을 삭제하시겠습니까?');
        if (confirmDelete) {
          const response = await fetch(`http://localhost:3001/comments/${contextMenu.target.id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete the comment');
          const updatedEvents = events.map((event) => {
            if (event.id === contextMenu.target['board-id']) {
              const updatedComments = event.comments.filter((comment) => comment.id !== contextMenu.target.id);
              return { ...event, comments: updatedComments };
            }
            return event;
          });
          setEvents(updatedEvents);
        }
      }
      handleCloseContextMenu();
      handleUpdateLayout();
    } catch (error) {
      console.error(error);
    }
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
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default EventsBoardPage;
