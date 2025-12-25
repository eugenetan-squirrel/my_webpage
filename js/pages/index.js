import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const ref = doc(db, "stats", "subscriptions");

async function loadCount() {
  const snap = await getDoc(ref);
  document.getElementById("count").textContent = snap.data().count;
  loadCount();
}

let state = null;

async function vote(type) {
  const upBtn = document.getElementById("upvote");
  const downBtn = document.getElementById("downvote");

  if (state === type) {
    voteState = null;
    await updateDoc(ref, { count: increment(type === 'up' ? -1 : 1) });
  } else {
    if (state === "up") {
      await updateDoc(ref, { count: increment(2)})
    } else {
      await updateDoc(ref, { count: increment(-2)})
    }
  }
}



async function upvote(button) {
  await updateDoc(ref, {count: increment(1)});
  loadCount();
  button.disabled=true;
  document.getElementById(downvote).disabled=false;
}

async function downvote(button) {
  await updateDoc(ref, {count: increment(-1)});
  loadCount();
  button.disabled = true;
  document.getElementById(upvote).disabled=false;
}

window.upvote = upvote;
window.downvote = downvote;

loadCount();