import { displayListings } from "./src/js/ui/listings/listings.js";
import { displayUserNav } from "./src/js/ui/global/profile.js";
import { setLogoutListener } from "./src/js/ui/global/logout.js";

displayUserNav();

displayListings();

setLogoutListener();