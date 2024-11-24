import { displayListings } from "./src/js/ui/listings/listings.js";
import { displayUser } from "./src/js/ui/global/profile.js";
import { setLogoutListener } from "./src/js/ui/global/logout.js";

displayUser();

displayListings();

setLogoutListener();

