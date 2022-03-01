import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  query,
  getDoc,
  deleteDoc,
  addDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnMm17-iqiLMLTn35ZyjMUIxd8j-Q4LB4",

  authDomain: "kindlin-3823c.firebaseapp.com",

  databaseURL:
    "https://kindlin-3823c-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "kindlin-3823c",

  storageBucket: "kindlin-3823c.appspot.com",

  messagingSenderId: "619758161192",

  appId: "1:619758161192:web:25c59b88a13c3f9026d41d",

  measurementId: "G-9QHX2T2GGX",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const profiles = (id) => {
  return doc(db, "profiles/" + id);
};
const events = (id) => {
  return doc(db, "events/" + id);
};

async function getEvents() {
  const querySnapshot = await getDocs(query(collection(db, "events")));
  let eventList = [];
  querySnapshot.forEach((snap) => {
    eventList.push(snap.data());
  });
  return eventList;
}

async function getEvent(id) {
  return (await getDoc(events(id))).data();
}

async function removeEvent(id) {
  return await deleteDoc(events(id));
}

function getEventUsers(id) {
  return getEvent(id).eventUsers;
}

async function addEvent(event) {
  return await addDoc(collection(db, "events"), event);
}

async function updateEvent(id, event) {
  return await updateDoc(events(id), event);
}

async function addProfile(profile) {
  return await addDoc(collection(db, "profiles"), profile);
}

async function getProfile(id) {
  return (await getDoc(profiles(id))).data();
}

async function removeProfile(id) {
  return await deleteDoc(profiles(id));
}

async function updateProfile(id, profile) {
  return await updateDoc(profiles(id), profile);
}

async function getStage() {
  return (await getDoc(doc(db, "stage/stage"))).data();
}

async function setStage(stage) {
  return await updateDoc(doc(db, "stage/stage"), stage);
}

function stageListener() {
  return onSnapshot(doc(db, "stage/stage"), async (doc) => {
    doc.data()
  });
}

export const firestoreDB = {
  getEvents,
  getEvent,
  getStage,
  addEvent,
  addProfile,
  updateEvent,
  updateProfile,
  getEventUsers,
  getProfile,
  setStage,
  removeEvent,
  removeProfile,
  stageListener,
  db,
};
