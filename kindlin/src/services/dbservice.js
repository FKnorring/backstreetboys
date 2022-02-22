import { authHeader } from "../helpers/authHeader";

export const dbService = {
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
  getEventUsers,
  addEvent,
  removeEvent,
};

const api = "http://localhost:3000/";

function getEvents() {
  return dbRequest("GET", null, "events");
}

function addEvent(event) {
  return dbRequest("POST", event, "events");
}

async function getEventUsers(id) {
  let event = await getEvent(id);
  return event.eventUsers;
}

async function removeEvent(id) {
  let eventUsers = await getEventUsers(id);
  eventUsers.forEach(async (userId) => {
    let profile = (await getProfile(userId))[0];
    profile.myEvents = profile.myEvents.filter((eventId) => {
      return eventId !== id;
    });
    updateProfile(profile, profile.userId);
  });
  dbRequest("DELETE", null, "events/" + id);
}

async function signUp(email, password) {
  return await dbRequest("POST", { email, password }, "users").then((user) => {
    // login successful if there's a jwt token in the response
    if (user.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  });
}

async function login(email, password) {
  return await dbRequest("POST", { email, password }, "login").then((user) => {
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
  return dbRequest("GET", null, "users");
}

function removeAcc() {
  let id = JSON.parse(localStorage.getItem("user")).user.id;

  dbRequest("DELETE", null, "profile?userId=" + id);
  return dbRequest("DELETE", null, "users/" + id);
}

function makeProfile(profile) {
  return dbRequest("POST", profile, "profiles");
}

function getProfile(id) {
  return dbRequest("GET", null, "profiles?userId=" + id);
}

function getMatches(id) {
  return dbRequest("GET", null, "previousmatches?userId=" + id);
}

function getEvent(id) {
  return dbRequest("GET", null, "events/" + id);
}

function updateEvent(event, id) {
  return dbRequest("PUT", event, "events/" + id);
}

function updateProfile(profile, id) {
  return dbRequest("PUT", profile, "profiles/" + id);
}

function getStage() {
  return dbRequest("GET", null, "stage");
}

function updateStage(stage) {
  return dbRequest("PUT", stage, "stage");
}

async function dbRequest(type, content, dir) {
  const putPost = type === "PUT" || type === "POST";
  const requestOptions = {
    method: type,
    headers: putPost ? { "Content-Type": "application/json" } : authHeader(),
  };

  if (putPost) requestOptions.body = JSON.stringify(content);

  return await fetch(api + dir, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    // console.log(response);
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
