import React, { useState } from 'react';

const AddPeople = (props) => {
  const [screen, setScreen] = useState(true);

  const plusClickListener = () => {
    setScreen(!screen);
  };

  return (
    <>
      {screen ? (
        <button className='btn' onClick={plusClickListener}>+</button>
      ) : (
        <form
          className='team-member'
          onSubmit={(e) => {
            e.preventDefault();
            const upname = e.target.name.value;
            const upskill = e.target.skill.value;
            const upexperience = e.target.experience.value;
            const upcontact = e.target.contact.value;
            const uphobbie = e.target.hobbie.value;
            const upimg = e.target.img.value;

            const update = {
              name: upname,
              skill: upskill,
              experience: upexperience,
              contact: upcontact,
              hobbie: uphobbie,
              img: upimg,
            };
            props.addUserListener(update);
            setScreen(!screen);
          }}
        >
          <div className='update'>
            <div>
              <textarea type="text" id='name' placeholder='name' />
            </div>
            <div>
              <textarea type="text" id='skill' placeholder='skill' />
            </div>
            <div>
              <textarea type="text" id='experience' placeholder='experience' />
            </div>
            <div>
              <textarea type="text" id='contact' placeholder='contact' />
            </div>
            <div>
              <textarea type="text" id='hobbie' placeholder='hobbie' />
            </div>
            <div>
              <textarea type="text" id='img' placeholder='img' />
            </div>
          </div>
          <input type="submit" value={'추가'} className='submit' />
        </form>
      )}
    </>
  );
};

export default AddPeople;