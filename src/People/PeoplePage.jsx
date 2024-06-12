import React, { useState, useEffect } from 'react';
import People from './compo/People';
import AddPeople from './compo/AddPeople';
import { getUsers, addUser, updateUser, deleteUser } from './api';
import './PeoplePage.css'

const PeoplePage = () => {
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      setUserlist(users);
    };
    fetchData();
  }, []);

  const addUserListener = async (fromchild_data) => {
    const newUser = await addUser(fromchild_data);
    setUserlist((prevUser) => [...prevUser, newUser]);
  };

  const updateUserListener = async (img, name, contact, skill, experience, hobbie, user) => {
    const updatedUser = { ...user, img, name, contact, skill, experience, hobbie };
    await updateUser(user.id, updatedUser);
    setUserlist((prevUser) => prevUser.map((u) => (u.id === user.id ? updatedUser : u)));
  };

  const deleteUserListener = async (user) => {
    await deleteUser(user.id);
    setUserlist((prevUser) => prevUser.filter((u) => u.id !== user.id));
  };

  return (
    <div className="container-name">
      {/* <header>
        <h1>
          <img src='./people.jpg' alt="Team" />
          Team Name
        </h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#" className="active">People</a></li>
            <li><a href="#">Introduce</a></li>
            <li><a href="#">Events Board</a></li>
          </ul>
        </nav>
      </header>  */}
      <main>
        {userlist.map((e, num) => (
          <People
            key={e.id}
            people={e}
            count={num + 1}
            updateHandler={updateUserListener}
            deleteHandler={deleteUserListener}
          />
        ))}
        <AddPeople people={userlist} addUserListener={addUserListener} />
      </main>
    </div>
  );
};

export default PeoplePage;