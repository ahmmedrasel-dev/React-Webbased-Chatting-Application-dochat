import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCD7pZeoRPGqbYyNpGlWjm6TRzkPyv7E4w",
  authDomain: "dochat-fbb21.firebaseapp.com",
  projectId: "dochat-fbb21",
  storageBucket: "dochat-fbb21.appspot.com",
  messagingSenderId: "65805992486",
  appId: "1:65805992486:web:f7171eedc9ba1de9339ce7"
};

const app = initializeApp(firebaseConfig);
export { getAuth, createUserWithEmailAndPassword, updateProfile, getDatabase, ref, set }