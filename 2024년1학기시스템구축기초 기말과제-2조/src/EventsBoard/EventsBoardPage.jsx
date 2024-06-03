import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import './EventsBoardPage.css';
import eventImage1 from '../assets/images/event1.png';
import eventImage2 from '../assets/images/event2.png';
import eventImage3 from '../assets/images/event3.png';

const events = [
  {
    title: 'AAAAAAA',
    date: '2024-06-01',
    description: 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
  },
  {
    title: 'BBBB',
    date: '2024-06-10',
    description:
      'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    image: eventImage1,
  },
  {
    title: 'CCCCCCCCCCCCC',
    date: '2024-06-20',
    description: 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    image: eventImage2,
  },
  {
    title: 'DDDDD',
    date: '2024-06-25',
    description:
      'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
    image: eventImage3,
  },
  {
    title: 'EEEEEEEEEEEEEEEEEEE',
    date: '2024-07-01',
    description:
      'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
  },
  {
    title: 'FFF',
    date: '2024-07-05',
    description:
      'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, za, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
  },
];

const EventsBoardPage = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const msnry = new Masonry(gridRef.current, {
      itemSelector: '.event-card',
      columnWidth: '.event-sizer',
      percentPosition: true,
      gutter: 20,
    });

    imagesLoaded(gridRef.current, () => {
      msnry.layout();
    });

    return () => msnry.destroy();
  }, []);

  return (
    <div className="events-board-page">
      <div className="events-list" ref={gridRef}>
        <div className="event-sizer"></div>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

const EventCard = ({ event }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentChange = (e) => {
    setComments(e.target.value);
  };

  return (
    <div className="event-card">
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
          value={comments}
          onChange={handleCommentChange}
          className="comment-input"
        />
      </div>
    </div>
  );
};

export default EventsBoardPage;
