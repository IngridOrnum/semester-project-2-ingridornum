
import { displayUserNav, openProfilePage } from "./src/js/ui/global/profile.js";
import { setLogoutListener } from "./src/js/ui/global/logout.js";

async function initializeApp() {
    displayUserNav();
    setLogoutListener();
    openProfilePage();
}

initializeApp();
