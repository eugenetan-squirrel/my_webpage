
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