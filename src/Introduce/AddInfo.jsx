import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const AddInfo = ({ onAddBoxInfo, closeModal, initialData }) => {
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    categoryName: "",
    description: "",
    imageUrl: ""
  });

  useEffect(() => {
    if (initialData) {
      setInputs(initialData);
    }
  }, [initialData]);

  const changeListener = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const addBoxInfo = async () => {
    if ([inputs.categoryName, inputs.description, inputs.imageUrl].includes("")) {
      setError({ title: 'Error!!!', content: '카테고리 이름, 설명, 이미지 URL을 입력하시오.' });
      return;
    }

    try {
      let response;
      if (initialData) {
        response = await fetch(`http://localhost:3001/post/${initialData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputs)
        });
      } else {
        response = await fetch('http://localhost:3001/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputs)
        });
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      onAddBoxInfo(result);
      setInputs({ categoryName: "", description: "", imageUrl: "" });
      closeModal();
    } catch (error) {
      setError({ title: 'Error!!!', content: `Something went wrong: ${error.message}` });
    }
  };

  const closeErrorModal = () => {
    setError(null);
  };

  const cancelErrorModal = () => {
    setError(null);
  };

  return (
    <>
      {error && <Modal title={error.title} content={error.content} onOK={closeErrorModal} onCancel={cancelErrorModal} />}
      <div className="input-wrap">
        <input
          type="text"
          name="categoryName"
          placeholder="카테고리 이름"
          onChange={changeListener}
          value={inputs.categoryName}
        />
        <textarea
          name="description"
          placeholder="설명"
          onChange={changeListener}
          value={inputs.description}
          rows="5"
          style={{ width: '100%' }}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="이미지 URL"
          onChange={changeListener}
          value={inputs.imageUrl}
        />
        <button onClick={addBoxInfo}>{initialData ? "수정" : "추가"}</button>
      </div>
    </>
  );
};

export default AddInfo;


/* test용 */