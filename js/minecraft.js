import { db, query, orderBy, onSnapshot, serverTimestamp, addDoc, collection } from "./firebase.js";

if (sessionStorage.getItem("loggedIn") !== "true") {
    console.log("Please log in first!");
    window.location.href = "../index.html"
}

async function openUndetectable() {
    const html = await fetch("https://cdn.jsdelivr.net/gh/PlanetDogeCodes/Eagletcraft-1.12@main/source%20file/egc1-12.xml").then(r => r.text());
    const w = window.open("", "_blank");
    if (!w) return alert("Popup blocked");
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.document.documentElement.requestFullscreen?.();
}

async function send() {
  const text = messageInput.value.trim();
  if (!text) return;

  try {
    await addDoc(messagesCol, {
      username: username,
      text: text,
      timestamp: serverTimestamp()
    });
    messageInput.value = ""; // clear input
  } catch (err) {
    console.error("Error sending message:", err);
  }
}

const username = sessionStorage.getItem("username") || "Unknown";
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");

const messagesCol = collection(db, "messages");
const q = query(messagesCol, orderBy("timestamp", "asc"));
onSnapshot(q, (snapshot) => {
  chatBox.innerHTML = ""; // clear
  snapshot.forEach(doc => {
    const msg = doc.data();
    const div = document.createElement("div");
    div.textContent = `${msg.username}: ${msg.text}`;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
});

window.openUndetectable = openUndetectable;
window.send = send;