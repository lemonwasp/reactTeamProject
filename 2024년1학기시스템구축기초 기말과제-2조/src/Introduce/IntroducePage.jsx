import React, { useState, useEffect } from 'react';
import './IntroducePage.css';
import Modal from 'react-modal';
import AddInfo from './AddInfo';
import UseFetch from './UseFetch';

Modal.setAppElement('#root');

function IntroducePage() {
  // json server에 연결
  const TestData = UseFetch('http://localhost:3001/post');

  const [activeBox, setActiveBox] = useState(null);
  const [boxes, setBoxes] = useState([]);

  // db.json의 post에 들어있는 값이 변하면 재렌더링
  useEffect(() => {
    if (TestData !== undefined && TestData !== null && TestData.length > 0) {
      const formattedData = TestData.map((item) => ({
        id: item.id,
        categoryName: item.categoryName,
        description: item.description,
        imageUrl: item.imageUrl,
      }));
      setBoxes(formattedData);
    }
  }, [TestData]);

  // 모달 CRUD 관련 useState 선언
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [boxToDelete, setBoxToDelete] = useState(null);
  const [boxToEdit, setBoxToEdit] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  // 전체 container의 크기를 설정
  useEffect(() => {
    const updateWidth = () => {
      const containerMaxWidth = window.innerWidth * 0.85;
      document.documentElement.style.setProperty('--container-width', `${containerMaxWidth}px`);
      document.documentElement.style.setProperty(
        '--box-width',
        `${(containerMaxWidth - (boxes.length - 1) * 10) / boxes.length}px`
      );
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [boxes.length]);

  // 마우스 이벤트
  // 1) 마우스 over상태
  const handleMouseOver = (index) => {
    setActiveBox(index);
  };
  // 2) 마우스 out상태
  const handleMouseOut = () => {
    setActiveBox(null);
  };


  // 삭제시 모달 열림
  const openModal = (index) => {
    setBoxToDelete(index);
    setModalIsOpen(true);
  };
  // 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };


  // 삭제 기능
  const deleteBox = async () => {
    try {
      // json server에 연결 - 삭제 모드로
      const response = await fetch(`http://localhost:3001/post/${boxes[boxToDelete].id}`, {
        method: 'DELETE',
      });
      // 연결 불안정하면 알림
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // 삭제할 박스와 인덱스 값이 같으면 삭제
      setBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== boxToDelete));
      setBoxToDelete(null);
      setModalIsOpen(false);
    } catch (error) {
      console.error(`Error deleting box: ${error}`);
    }
  };
  

  //<추가>
  // 박스 추가할 때 모달 열기
  const addBox = () => {
    setInfoModalIsOpen(true);
  };
  // 추가 후 닫기
  const addBoxInfo = (info) => {
    setBoxes((prevBoxes) => [...prevBoxes, info]);
    closeInfoModal();
  };
  // 박스 닫기(추가 안하고)
  const closeInfoModal = () => {
    setInfoModalIsOpen(false);
  };


  // <수정>
  // 수정 모달 열기/닫기
  const openEditModal = (index) => {
    setBoxToEdit(index);
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };
  // 수정할 박스의 인덱스와 같으면 수정할 값으로, 아니면 원래 값으로 하고 닫기
  const updateBoxInfo = (updatedInfo) => {
    setBoxes((prevBoxes) => prevBoxes.map((box, index) => (index === boxToEdit ? updatedInfo : box)));
    closeEditModal();
  };

  return (
    <>
      <div className="head"></div>
      <div className="container">
        <div className="topBox">
          <img
            className="imageThumbnail"
            src="https://cdn.pixabay.com/photo/2021/06/12/02/38/cherry-blossoms-6329828_1280.jpg"
            alt="top"
          />
          <div className="topBoxOverlay">
            <div className="topBoxText">
              <span>Japan</span>
              <span>Introduce</span>
            </div>
          </div>
        </div>
        <div className="box-container">
          {boxes.map((box, index) => (
            <div
              key={index}
              className={`box ${activeBox === index ? 'active' : ''}`}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
              onClick={() => openEditModal(index)}
              onContextMenu={(e) => {
                e.preventDefault();
                openModal(index);
              }}
            >
              <img className="imageThumbnail" src={box.imageUrl} alt={`${index}`} />
              <div className="overlay">
                <div className={`text ${activeBox === index ? 'horizontal' : 'vertical'}`}>
                  <span className="category">{box.categoryName}</span>
                  {activeBox === index && <span className="description">{box.description}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addBox} className="add-button">
          카테고리 추가
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay-modal"
      >
        <h2>삭제하시겠습니까?</h2>
        <button onClick={deleteBox}>예</button>
        <button onClick={closeModal}>아니요</button>
      </Modal>
      <Modal
        isOpen={infoModalIsOpen}
        onRequestClose={closeInfoModal}
        className="modal"
        overlayClassName="overlay-modal"
      >
        <AddInfo onAddBoxInfo={addBoxInfo} closeModal={closeInfoModal} />
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        className="modal"
        overlayClassName="overlay-modal"
      >
        <AddInfo onAddBoxInfo={updateBoxInfo} closeModal={closeEditModal} initialData={boxes[boxToEdit]} />
      </Modal>
    </>
  );
}

export default IntroducePage;
