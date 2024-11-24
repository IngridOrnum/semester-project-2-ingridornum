import { displayListings } from "./src/js/ui/listings/listings.js";
import { displayUserNav, openProfilePage } from "./src/js/ui/global/profile.js";
import { setLogoutListener } from "./src/js/ui/global/logout.js";

async function initializeApp() {
    displayUserNav();
    displayListings();
    setLogoutListener();
    openProfilePage();
}

initializeApp();