import React from 'react';

const UpdateScreen = (props) => {

  const del = () => {
    const dellist = props.user;
    props.onOk();
    props.deleteuser(dellist);
  };

  return (
    <>
      <div className="P-modal-back"></div>
      <div className="P-modal-wrap">
        <header>
          <h2>{props.title}</h2>
          <button id="P-x-btn" onClick={props.onClose}>X</button>
        </header>
        <div className="content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const up_img = e.target.img.value;
              const up_name = e.target.name.value;
              const up_skill = e.target.skill.value;
              const up_experience = e.target.experience.value;
              const up_contact = e.target.contact.value;
              const up_hobbie = e.target.hobbie.value;
              props.updateHandler(up_img, up_name, up_contact, up_skill, up_experience, up_hobbie, props.user);
              props.onOk();
            }}
          >
            <div>Img<div><textarea name='img' defaultValue={props.user.img}></textarea></div></div>
            <div>Name<div><textarea name='name' defaultValue={props.user.name}></textarea></div></div>
            <div>Skill<div><textarea name='skill' defaultValue={props.user.skill}></textarea></div></div>
            <div>Experience<div><textarea name='experience' defaultValue={props.user.experience}></textarea></div></div>
            <div>Contact<div><textarea name='contact' defaultValue={props.user.contact}></textarea></div></div>
            <div>Hobbie<div><textarea name='hobbie' defaultValue={props.user.hobbie}></textarea></div></div>
            <footer>
              <button type='submit'>수정</button>
              <button type='button' onClick={del}>삭제</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateScreen;