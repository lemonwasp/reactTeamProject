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
    </div>
  );
};

export default PeoplePage;
