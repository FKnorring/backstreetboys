import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  query,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  orderBy,
  limit,
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
  return await setDoc(events(event.id), event);
}

async function updateEvent(id, event) {
  return await updateDoc(events(id), event);
}

async function addProfile(profile) {
  return await setDoc(profiles(profile.userId), profile);
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

function stageListener(ref) {
  return onSnapshot(doc(db, "stage/stage"), async (doc) => {
    ref.value = doc.data();
  });
}

function eventListener(ref, id) {
  return onSnapshot(doc(db, "events/" + id), async (doc) => {
    ref.value = doc.data();
  });
}

async function getNextEventId() {
  const querySnapshot = await getDocs(
    query(collection(db, "events"), orderBy("id", "desc"), limit(1))
  );
  let id = -1;
  querySnapshot.forEach((snap) => {
    id = snap.data().id;
  });
  console.log(id);
  return id + 1;
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
  eventListener,
  getNextEventId,
  db,
  //updateMatches,
};
