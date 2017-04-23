import axios from 'axios';

let payload;

function saveToken(token) {
  localStorage['vue-admin-token'] = token;
}

function getToken() {
  return localStorage['vue-admin-token'];
}

function getPayload() {
  if (payload) {
    return payload;
  }

  const token = getToken();
  if (token) {
    payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }

  return null;
}

function currentUser() {
  const loginInfo = getPayload();

  if (loginInfo) {
    return payload;
  }

  return null;
}

function register(user) {
  return axios.post('/register', user)
    .then(res => saveToken(res.data.token));
}

function login(user) {
  return axios.post('/api/login', user)
    .then((res) => {
      saveToken(res.data.token);
      return currentUser();
    });
}

function logout() {
  localStorage.removeItem('vue-admin-token');
  payload = null;
}

function changePassword(data) {
  return axios.put('/password', data)
    .then(() => logout());
}

function isLoggedIn() {
  const loginInfo = getPayload();

  if (loginInfo) {
    return loginInfo.exp > Date.now() / 1000;
  }

  return false;
}

export {
  saveToken,
  getToken,
  register,
  login,
  logout,
  isLoggedIn,
  currentUser,
  changePassword,
};
