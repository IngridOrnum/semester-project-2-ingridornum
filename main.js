
import { displayUserNav, openAccountPage, openMenuDropdown } from "./src/js/ui/global/header.js";
import { setLogoutListener } from "./src/js/ui/global/logout.js";

async function initializeApp() {
    displayUserNav();
    setLogoutListener();
    openAccountPage();
    openMenuDropdown()
}

initializeApp();
