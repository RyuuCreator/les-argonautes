import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgr4JO1OqEdiToSFvvfG5qFDHTqpT2JoI",
  authDomain: "les-argonautes-ad781.firebaseapp.com",
  projectId: "les-argonautes-ad781",
  storageBucket: "les-argonautes-ad781.appspot.com",
  messagingSenderId: "1003088394462",
  appId: "1:1003088394462:web:95e1323723d6368fa82a4f",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Création du nouveau membre
export const createMembres = (name) => {
  db.collection("membres").add({
    name,
  });
};

// lire les membres
export const readMembres = async (membres) => {
  const collection = db.collection(membres);
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => doc.data());
};
