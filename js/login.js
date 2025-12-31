import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

async function login(usertbid, pwtbid, msgid) {
    const username = document.getElementById(usertbid).value.trim();
    const password = document.getElementById(pwtbid).value;
    const message = document.getElementById(msgid);

    const ref = doc(db, "users", username);
    const snap = await getDoc(ref)

    if (!snap.exists()) {
        message.textContent = "Invalid username.";
        return;
    }

    const data = snap.data()

    if (data.password === password) {
        message.textContent = "Successful sign in!";
        return;
    } else {
        message.textContent = "Invalid password.";
        return;
    }
}

async function signup(usertbid, pwtbid, msgid) {
    const username = document.getElementById(usertbid).value.trim();
    const password = document.getElementById(pwtbid).value;
    const message = document.getElementById(msgid);

    const ref = doc(db, "users", username);
    const snap = await getDoc(ref)

    if (snap.exists()) {
        message.textContent = "Username already exists.";
        return;
    }

    if (!username || !password) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    await setDoc(ref, { password: password })
    message.textContent = "Signup successful!";
}

window.login = login;
window.signup = signup;