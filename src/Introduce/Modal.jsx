import React from 'react';

const Modal = (props) => {
  return (
    <>
      <div className="modal-back" onClick={props.onCancel}></div>
      <div className="modal-wrap">
        <header>
          <h2>{props.title}</h2>
          <button id="x-btn" onClick={props.onCancel}>X</button>
        </header>
        <div className="content">{props.content}</div>
        <footer><button onClick={props.onOK}>확인</button></footer>
      </div>
    </>
  );
}

export default Modal;