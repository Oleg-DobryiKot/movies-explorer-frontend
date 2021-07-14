export const BASE_URL = 'https://api.matveev-oleg.nomoredomains.club'; 
// export const BASE_URL = 'http://localhost:3003';

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

function buildCelebrateError(err) {
  const message = err.message;
  const validation = err.validation?.body?.message;

  return new Error(`${ message }${ validation ? `: ${ validation }` : '' }`);
}

function handleCelebrateResponse(res) {
  if (res.status === 200) {
    return res.json();
  }
  return res.json().then(error => Promise.reject(buildCelebrateError(error)));
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    'credentials': 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(handleCelebrateResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    'credentials': 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(responseCheck);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    'credentials': 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(responseCheck);
}
