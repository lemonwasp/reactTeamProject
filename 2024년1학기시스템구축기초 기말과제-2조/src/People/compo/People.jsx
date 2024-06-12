import React, { useState } from 'react';
import UpdateScreen from './UpdateScreen';

const People = (props) => {
  const [upScreen, setUpScreen] = useState(true);

  const changeListener = () => {
    setUpScreen(!upScreen);
  };

  return (
    upScreen ? (
      props.count % 2 === 1 ? (
        <div className="team-member left" onContextMenu={changeListener}>
          <div className="img-Box">
            <img src={props.people.img} alt="Profile" />
          </div>
          <div className="info">
            <div className='name-box'>
              <span><strong>Name {props.people.name}</strong></span>
            </div>
            <div className='skill-box'>
              <span>Skills {props.people.skill}</span>
            </div>
            <div className='Experience-box'>
              <span className="last">Experience {props.people.experience}</span>
            </div>
            <br />
            <div className='contact-box'>
              <span>Contact {props.people.contact}</span>
            </div>
            <br />
            <div className='hobbie-box'>
              <span className="last">Hobbies {props.people.hobbie}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="team-member right" onContextMenu={changeListener}>
          <div className="img-Box">
            <img src={props.people.img} alt="Profile" />
          </div>
          <div className="info">
            <div className='name-box'>
              <span><strong> Name {props.people.name}</strong></span>
            </div>
            <div className='skill-box'>
              <span> Skills {props.people.skill}</span>
            </div>
            <div className='Experience-box'>
              <span className="last">Experience {props.people.experience}</span>
            </div>
            <br />
            <div className='contact-box'>
              <span> Contact {props.people.contact}</span>
            </div>
            <br />
            <div className='hobbie-box'>
              <span className="last"> Hobbies {props.people.hobbie}</span>
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
    )
  );
};

export default People;