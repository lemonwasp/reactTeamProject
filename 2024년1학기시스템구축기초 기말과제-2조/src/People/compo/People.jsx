import React, { useState } from 'react';
import UpdateScreen from './UpdateScreen';

const People = (props) => {
  const [upScreen, setUpScreen] = useState(true);

  const changeListener = () => {
    setUpScreen(!upScreen);
  };

  return upScreen ? (
    props.count % 2 === 1 ? (
      <div className="team-member left" onContextMenu={changeListener}>
        <div className="img-Box">
          <img src={props.people.img} alt="Profile" />
        </div>
        <div className="info">
          <div className="name-box">
            <span>
              <strong>Name</strong> {props.people.name}
            </span>
          </div>
          <div className="skill-box">
            <span>
              <strong>Skills</strong> {props.people.skill}
            </span>
          </div>
          <div className="Experience-box">
            <span className="last">
              <strong>Experience</strong> {props.people.experience}
            </span>
          </div>
          <br />
          <div className="contact-box">
            <span>
              <strong>Contact</strong>{' '}
              {props.people.contact.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </span>
          </div>
          <br />
          <div className="hobbie-box">
            <span className="last">
              <strong>Hobbies</strong> {props.people.hobbie}
            </span>
          </div>
        </div>
      </div>
    ) : (
      <div className="team-member right" onContextMenu={changeListener}>
        <div className="img-Box">
          <img src={props.people.img} alt="Profile" />
        </div>
        <div className="info">
          <div className="name-box">
            <span>
              <strong>Name</strong> {props.people.name}
            </span>
          </div>
          <div className="skill-box">
            <span>
              <strong>Skills</strong> {props.people.skill}
            </span>
          </div>
          <div className="Experience-box">
            <span className="last">
              <strong>Experience</strong> {props.people.experience}
            </span>
          </div>
          <br />
          <div className="contact-box">
            <span>
              <strong>Contact</strong>{' '}
              {props.people.contact.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </span>
          </div>
          <br />
          <div className="hobbie-box">
            <span className="last">
              <strong>Hobbies</strong> {props.people.hobbie}
            </span>
          </div>
        </div>
      </div>
    )
  ) : (
    <UpdateScreen
      title={'수정'}
      user={props.people}
      updateHandler={props.updateHandler}
      onOk={changeListener}
      onClose={changeListener}
      deleteuser={props.deleteHandler}
    />
  );
};

export default People;
