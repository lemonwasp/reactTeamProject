const API_URL = 'http://localhost:3001/members';

export const getUsers = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const addUser = async (user) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};