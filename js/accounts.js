import { db, doc, getDoc } from "./firebase.js";

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
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", username);
        window.location.href = "/pages/minecraft.html";
        return;
    } else {
        message.textContent = "Invalid password.";
        return;
    }
}

async function adminCheck(pwtbid, msgid) {
    const password = document.getElementById(pwtbid).value;
    const message = document.getElementById(msgid);

    const ref = doc(db, "admin", "admin");
    const snap = await getDoc(ref)

    if (!snap.exists()) {
        message.textContent = "Invalid admin username.";
        return;
    }

    const data = snap.data()

    if (data.code === password) {
        message.textContent = "Successful admin sign in!";
        sessionStorage.setItem("isAdmin", "true");
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", "Admin (Eugene)");
        window.location.href = "/pages/admin.html";
        return;
    } else {
        message.textContent = "Invalid admin password.";
        return;
    }
}

window.adminCheck = adminCheck;
window.login = login;
window.signup = signup;