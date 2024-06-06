import React, { useState, useEffect } from 'react';
import './IntroducePage.css';
import Modal from 'react-modal';
import AddInfo from './AddInfo';

Modal.setAppElement('#root'); 

function App() {
  const [activeBox, setActiveBox] = useState(null);
  const [boxes, setBoxes] = useState([
    { categoryName: '여행지', description: '도톤보리, 덴덴타운, 유니버셜 스튜디오, ...', imageUrl: 'https://cdn.pixabay.com/photo/2019/04/20/11/39/japan-4141578_1280.jpg' },
    { categoryName: '음식', description: '라멘, 스시, 장어덮밥, ...', imageUrl: 'https://cdn.pixabay.com/photo/2021/09/27/02/36/ramen-6659278_1280.jpg' },
    { categoryName: '교통편', description: '지하철, 비행기, 배, ...', imageUrl: 'https://cdn.pixabay.com/photo/2020/05/30/01/03/shinkansen-5237269_1280.jpg' }
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [boxToDelete, setBoxToDelete] = useState(null);
  const [boxToEdit, setBoxToEdit] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      const containerMaxWidth = window.innerWidth * 0.85;
      document.documentElement.style.setProperty('--container-width', `${containerMaxWidth}px`);
      document.documentElement.style.setProperty('--box-width', `${(containerMaxWidth - (boxes.length - 1) * 10) / boxes.length}px`);
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

  const deleteBox = () => {
    setBoxes(prevBoxes => prevBoxes.filter((_, i) => i !== boxToDelete));
    setBoxToDelete(null);
    setModalIsOpen(false);
  };

  const addBox = () => {
    setInfoModalIsOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalIsOpen(false);
  };

  const addBoxInfo = (info) => {
    setBoxes(prevBoxes => [...prevBoxes, info]);
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
    setBoxes(prevBoxes =>
      prevBoxes.map((box, index) =>
        index === boxToEdit ? updatedInfo : box
      )
    );
    closeEditModal();
  };

  return (
    <>
      <div className='head'></div>
      <div className='container'>
        <div className='topBox'>
          <img className="imageThumbnail" src="https://cdn.pixabay.com/photo/2021/06/12/02/38/cherry-blossoms-6329828_1280.jpg" alt='top' />
          <div className="topBoxOverlay">
            <div className="topBoxText">
              <span>Japan</span>
              <span>Introduce</span>
            </div>
          </div>
        </div>
        <div className='box-container'>
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
        <button onClick={addBox} className='add-button'>카테고리 추가</button>
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

export default App;
