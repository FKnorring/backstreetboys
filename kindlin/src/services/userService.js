import { authHeader } from "../helpers/authHeader";

export const userService = {
  signUp,
  login,
  logout,
  getAll,
  removeAcc,
  updateProfile,
  getProfile,
};

function signUp(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch("http://localhost:3000/users", requestOptions)
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch("http://localhost:3000/login", requestOptions)
    .then(handleResponse)
    .then((user) => {
      console.log(user);
      // login successful if there's a jwt token in the response
      if (user.accessToken) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch("http://localhost:3000/users", requestOptions).then(
    handleResponse
  );
}

function removeAcc() {
  let id = JSON.parse(localStorage.getItem("user")).user.id;

  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  logout();
  fetch("http://localhost:3000/profile/" + id, requestOptions).then(
    handleResponse
  );
  return fetch("http://localhost:3000/users/" + id, requestOptions).then(
    handleResponse
  );
}

function updateProfile(profile) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: profile,
  };

  return fetch("http://localhost:3000/profiles", requestOptions).then(
    handleResponse
  );
}

function getProfile() {
  let id = JSON.parse(localStorage.getItem("user")).user.id;

  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch("http://localhost:3000/profiles/" + id, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    console.log(response);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
