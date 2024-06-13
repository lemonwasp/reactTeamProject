import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './HomePageStyle.css';
import ScheduleBtn from './button-img.png';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedModalDate, setSelectedModalDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({});
  const [editingScheduleId, setEditingScheduleId] = useState(null);

  const onChange = (date) => {
    setSelectedDate(date);
  };

  const handleScheduleClick = () => {
    setModalOpen(true);
    setSelectedModalDate(selectedDate);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
    setSelectedModalDate(date);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingScheduleId(null);
    setTitle('');
    setContent('');
  };

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleModalDateChange = (date) => {
    setSelectedModalDate(date);
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    const formattedDate = formatDate(selectedModalDate);
    const newScheduleData = { ...scheduleData };

    if (editingScheduleId) {
      newScheduleData[formattedDate] = newScheduleData[formattedDate].map((schedule) =>
        schedule.id === editingScheduleId ? { id: editingScheduleId, title, content } : schedule
      );
      setEditingScheduleId(null);
    } else {
      const newId = new Date().getTime(); // Generate a unique ID based on timestamp
      const newSchedule = { id: newId, title, content };

      if (newScheduleData[formattedDate]) {
        newScheduleData[formattedDate].push(newSchedule);
      } else {
        newScheduleData[formattedDate] = [newSchedule];
      }
    }

    setScheduleData(newScheduleData);
    closeModal();
  };

  const handleDelete = (date, id) => {
    const newScheduleData = { ...scheduleData };
    newScheduleData[date] = newScheduleData[date].filter((schedule) => schedule.id !== id);

    if (newScheduleData[date].length === 0) {
      delete newScheduleData[date];
    }

    setScheduleData(newScheduleData);
  };

  const handleEdit = (date, id) => {
    const schedule = scheduleData[date].find((schedule) => schedule.id === id);
    setTitle(schedule.title);
    setContent(schedule.content);
    setSelectedModalDate(new Date(date));
    setEditingScheduleId(id);
    setModalOpen(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      closeModal();
    }
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="calendar-container">
        <div className="some2">
          <p className="Event-title">
            Team
            <br />
            <span style={{ fontSize: 30, fontWeight: 700 }}>Event</span>
          </p>
          <button className="newschedule" onClick={handleScheduleClick}>
            <img src={ScheduleBtn} alt="Schedule Button" style={{ width: '50px', height: '50px' }} />
          </button>
        </div>
        <Calendar
          formatDay={(locale, date) => date.getDate()}
          onChange={onChange}
          value={selectedDate}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const formattedDate = formatDate(date);
              const schedules = scheduleData[formattedDate];
              return (
                <div className="schedule-preview">
                  {schedules &&
                    schedules.map((schedule, index) => (
                      <div key={index} className="schedule-title">
                        {schedule.title}
                      </div>
                    ))}
                </div>
              );
            }
          }}
          onClickDay={handleDayClick}
        />
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{editingScheduleId ? '일정 수정' : '일정 추가'}</h2>
            <input type="text" value={title} onChange={(e) => handleInputChange(e, setTitle)} placeholder="제목" />
            <input
              type="date"
              value={formatDate(selectedModalDate)}
              onChange={(e) => handleModalDateChange(new Date(e.target.value))}
            />
            <textarea value={content} onChange={(e) => handleInputChange(e, setContent)} placeholder="내용" />
            <button className="submit-button" onClick={handleSubmit}>
              {editingScheduleId ? '수정' : '추가'}
            </button>

            <div className="schedule-list">
              <h2>일정 목록</h2>
              {Object.keys(scheduleData).map((date) => (
                <div key={date} className="schedule-item">
                  <h3>{date}</h3>
                  {scheduleData[date].map((schedule) => (
                    <div key={schedule.id} className="schedule-entry">
                      <h4>{schedule.title}</h4>
                      <p>{schedule.content}</p>
                      <button className="edit-button" onClick={() => handleEdit(date, schedule.id)}>
                        수정
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(date, schedule.id)}>
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
