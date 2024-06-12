import React, { useState, useEffect } from 'react';
import './IntroducePage.css';
import Modal from 'react-modal';
import AddInfo from './AddInfo';
import UseFetch from './UseFetch';

Modal.setAppElement('#root');

function IntroducePage() {
  const TestData = UseFetch('http://localhost:3001/post');

  const [activeBox, setActiveBox] = useState(null);
  const [boxes, setBoxes] = useState([]);

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [boxToDelete, setBoxToDelete] = useState(null);
  const [boxToEdit, setBoxToEdit] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

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

  const handleMouseOver = (index) => {
    setActiveBox(index);
  };

  const handleMouseOut = () => {
    setActiveBox(null);
  };

  const openModal = (index) => {
    setBoxToDelete(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteBox = async () => {
    try {
      const response = await fetch(`http://localhost:3001/post/${boxes[boxToDelete].id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== boxToDelete));
      setBoxToDelete(null);
      setModalIsOpen(false);
    } catch (error) {
      console.error(`Error deleting box: ${error}`);
    }
  };

  const addBox = () => {
    setInfoModalIsOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalIsOpen(false);
  };

  const addBoxInfo = (info) => {
    setBoxes((prevBoxes) => [...prevBoxes, info]);
    closeInfoModal();
  };

  const openEditModal = (index) => {
    setBoxToEdit(index);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

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
        contentLabel="Delete Box Confirmation"
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
        contentLabel="Add Box Information"
        className="modal"
        overlayClassName="overlay-modal"
      >
        <AddInfo onAddBoxInfo={addBoxInfo} closeModal={closeInfoModal} />
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Box Information"
        className="modal"
        overlayClassName="overlay-modal"
      >
        <AddInfo onAddBoxInfo={updateBoxInfo} closeModal={closeEditModal} initialData={boxes[boxToEdit]} />
      </Modal>
    </>
  );
}

export default IntroducePage;
