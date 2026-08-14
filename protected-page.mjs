import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const isAdminPage = window.location.pathname.replaceAll("\\", "/").includes("/admin/");
const loginUrl = new URL(isAdminPage ? "./admin-login.html" : "./login.html", import.meta.url).href;
const userDashboardUrl = new URL("./user/dashboard.html", import.meta.url).href;
let redirecting = false;

function replacePage(url) {
    if (redirecting) return;
    redirecting = true;
    window.location.replace(url);
}

async function requireCurrentAccess() {
    if (typeof auth.authStateReady === "function") {
        await auth.authStateReady();
    }

    const user = auth.currentUser;
    if (!user) {
        replacePage(loginUrl);
        return;
    }

    if (!isAdminPage) return;

    try {
        const profile = await getDoc(doc(getFirestore(app), "users", user.uid));
        const role = profile.exists() ? String(profile.data().role || "user").toLowerCase() : "user";
        if (role !== "admin") replacePage(userDashboardUrl);
    } catch (error) {
        console.error("Protected page authorization check failed:", error);
        replacePage(loginUrl);
    }
}

onAuthStateChanged(auth, (user) => {
    if (!user) replacePage(loginUrl);
});

window.addEventListener("pageshow", () => {
    void requireCurrentAccess();
});

void requireCurrentAccess();
