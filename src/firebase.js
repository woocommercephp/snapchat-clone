import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDibKq3NSxbb-tNvoxaxR8VPy1zioPUAY0",
  authDomain: "snapchat-clone-d5dfd.firebaseapp.com",
  projectId: "snapchat-clone-d5dfd",
  storageBucket: "snapchat-clone-d5dfd.appspot.com",
  messagingSenderId: "670379449415",
  appId: "1:670379449415:web:3b65099989dfcbe0482562",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
