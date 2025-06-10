export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((u) => u.email === email);
};

export const validateUser = (email, password) => {
  const user = findUserByEmail(email);
  return user && user.password === password ? user : null;
};

export const createUser = (user) => {
  const users = getUsers();
  if (findUserByEmail(user.email)) {
    throw new Error('User already exists');
  }
  users.push(user);
  saveUsers(users);
};

export const updateUser = (email, updatedData) => {
  const users = getUsers();
  const index = users.findIndex((u) => u.email === email);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    saveUsers(users);
  }
};

export const resetPassword = (email, oldPassword, newPassword) => {
  const users = getUsers();
  const index = users.findIndex((u) => u.email === email);
  if (index === -1 || users[index].password !== oldPassword) {
    throw new Error('Invalid old password');
  }
  users[index].password = newPassword;
  saveUsers(users);
};

export const deleteUser = (email) => {
  let users = getUsers();
  users = users.filter((user) => user.email !== email);
  saveUsers(users);
};
