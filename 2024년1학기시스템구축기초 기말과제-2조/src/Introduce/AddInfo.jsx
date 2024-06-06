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

  const addBoxInfo = () => {
    if ([inputs.categoryName, inputs.description, inputs.imageUrl].includes("")) {
      setError({ title: 'Error!!!', content: '카테고리 이름, 설명, 이미지 URL을 입력하시오.' });
      return;
    }

    onAddBoxInfo(inputs);
    setInputs({ categoryName: "", description: "", imageUrl: "" });
    closeModal();
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
        <input
          type="text"
          name="description"
          placeholder="설명"
          onChange={changeListener}
          value={inputs.description}
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