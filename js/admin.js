import { db, doc, setDoc, getDoc, deleteDoc } from "./firebase.js";

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
    message.textContent = "Account creation successful!";
}

async function deleteAccount(usertbid, msgid) {
    const username = document.getElementById(usertbid).value.trim();
    const message = document.getElementById(msgid);
    const ref = doc(db, "users", username);
    const snap = await getDoc(ref)

    if (!snap.exists()) {
        message.textContent = "Username does not exist.";
        return;
    }

    await deleteDoc(ref);
    message.textContent = "Account deletion successful!";
}

if (sessionStorage.getItem("isAdmin") !== "true") {
    alert("Hold up! Please verify your admin credentials.");
    window.location.href = "admincheck.html";
}

window.deleteAccount = deleteAccount;
window.signup = signup;