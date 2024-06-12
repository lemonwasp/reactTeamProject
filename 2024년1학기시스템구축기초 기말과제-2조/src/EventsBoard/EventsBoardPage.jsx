import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { useNavigate, useLocation } from 'react-router-dom';
import EventCard from './EventCard';
import './EventsBoardPage.css';

const EventsBoardPage = () => {
  const gridRef = useRef(null); // Masonry 레이아웃을 적용할 그리드 요소의 레퍼런스
  const msnry = useRef(null); // Masonry 인스턴스의 레퍼런스
  const [events, setEvents] = useState([]); // 이벤트 목록 상태
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, target: null, type: '' }); // 컨텍스트 메뉴 상태
  const navigate = useNavigate(); // 페이지 네비게이션 훅
  const location = useLocation(); // 현재 위치 정보를 가져오는 훅

  // 서버에서 이벤트와 댓글 데이터를 가져오는 함수
  const getData = async () => {
    const [eventsRes, commentsRes] = await Promise.all([
      fetch('http://localhost:3001/boards').then((res) => res.json()),
      fetch('http://localhost:3001/comments').then((res) => res.json()),
    ]);

    // 각 이벤트에 해당하는 댓글을 매핑하여 상태 업데이트
    const eventsWithComments = eventsRes.map((event) => ({
      ...event,
      comments: commentsRes.filter((comment) => comment['board-id'] === event.id),
    }));

    setEvents(eventsWithComments);

    // Masonry 레이아웃 초기화
    msnry.current = new Masonry(gridRef.current, {
      itemSelector: '.event-card',
      columnWidth: '.event-sizer',
      percentPosition: true,
      gutter: 20,
    });
  };

  // 이미지 로드 완료 후 Masonry 레이아웃 적용
  useEffect(() => {
    imagesLoaded(gridRef.current, () => {
      if (msnry.current) {
        msnry.current.layout();
      }
    });
  }, [events]);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    getData();
    return () => {
      if (msnry.current) {
        msnry.current.destroy();
      }
    };
  }, []);

  // 위치 상태 업데이트 시 이벤트 상태 업데이트
  useEffect(() => {
    if (location.state && location.state.updatedEvent) {
      const updatedEvent = location.state.updatedEvent;
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event))
      );
    }
  }, [location.state]);

  // Masonry 레이아웃 업데이트 함수
  const handleUpdateLayout = () => {
    if (msnry.current) {
      msnry.current.layout();
    }
  };

  // 컨텍스트 메뉴 표시 함수
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

  // 컨텍스트 메뉴 닫기 함수
  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, target: null, type: '' });
  };

  // 이벤트 또는 댓글 수정 함수
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
          // 페이지 새로고침
          window.location.reload();
        } else {
          console.error('Failed to update comment');
        }
      }
    }
    handleCloseContextMenu();
    handleUpdateLayout();
  };

  // 이벤트 또는 댓글 삭제 함수
  const handleDelete = async () => {
    try {
      if (contextMenu.type === 'event') {
        const confirmDelete = window.confirm('이 게시글을 삭제하시겠습니까?');
        if (confirmDelete) {
          const response = await fetch(`http://localhost:3001/boards/${contextMenu.target.id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete the event');
          // 페이지 새로고침
          window.location.reload();
        }
      } else if (contextMenu.type === 'comment') {
        const confirmDelete = window.confirm('이 댓글을 삭제하시겠습니까?');
        if (confirmDelete) {
          const response = await fetch(`http://localhost:3001/comments/${contextMenu.target.id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete the comment');
          // 페이지 새로고침
          window.location.reload();
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
