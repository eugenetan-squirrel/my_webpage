import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, query, orderBy, onSnapshot, serverTimestamp, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwqnfRXzNVNx0CtoaBTdbn5koPkgcVc_w",
    authDomain: "my-webpage-67isded.firebaseapp.com",
    projectId: "my-webpage-67isded",
    storageBucket: "my-webpage-67isded.firebasestorage.app",
    messagingSenderId: "203044731298",
    appId: "1:203044731298:web:71eb27c97f212829ff9afb",
    measurementId: "G-6NBGPHRVEL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, doc, setDoc, getDoc, deleteDoc, query, orderBy, onSnapshot, serverTimestamp, addDoc, collection };