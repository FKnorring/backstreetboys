import { authHeader } from "../helpers/authHeader";

export const userService = {
  signUp,
  login,
  logout,
  getAll,
  removeAcc,
  makeProfile,
  updateProfile,
  updateEvent,
  updateStage,
  getProfile,
  getEvents,
  getEvent,
  getMatches,
  getStage,
  addEvent,
  removeEvent,
};

function getEvents() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch("http://localhost:3000/events", requestOptions).then(
    handleResponse
  );
}

function addEvent(event) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  };
  console.log("hej");
  return fetch("http://localhost:3000/events/", requestOptions).then(
    handleResponse
  );
}

function removeEvent(id) {
  
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  console.log(id);
  return fetch("http://localhost:3000/events/" + id, requestOptions).then(
    handleResponse
  );
}


function signUp(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, profile: [] }),
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

function makeProfile(profile) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  };

  return fetch("http://localhost:3000/profiles/", requestOptions).then(
    handleResponse
  );
}

function getProfile(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    "http://localhost:3000/profiles?userId=" + id,
    requestOptions
  ).then(handleResponse);
}

function getMatches(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    "http://localhost:3000/previousmatches?userId=" + id,
    requestOptions
  ).then(handleResponse);
}

function getEvent(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    "http://localhost:3000/events?id=" + id,
    requestOptions
  ).then(handleResponse);
}

function updateEvent(event, id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  };
  return fetch("http://localhost:3000/events/" + id, requestOptions).then(
    handleResponse
  );
}

function updateProfile(profile, id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  };
  return fetch("http://localhost:3000/profiles/" + id, requestOptions).then(
    handleResponse
  );
}

function getStage() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    "http://localhost:3000/stage",
    requestOptions
  ).then(handleResponse);
}

function updateStage(stage) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stage),
  }

  return fetch("http://localhost:3000/stage", requestOptions).then(
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

