
import { displayUserNav, openProfilePage } from "./src/js/ui/global/profile.js";
import { setLogoutListener } from "./src/js/ui/global/logout.js";
import {authGuard} from "./src/js/utilities/authGuard.js";

async function initializeApp() {
    displayUserNav();
    setLogoutListener();
    openProfilePage();
}

initializeApp();
authGuard()