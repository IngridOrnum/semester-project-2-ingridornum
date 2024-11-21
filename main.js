import { readAllListings } from "./src/js/api/listings/read.js";

async function displayListings () {
    const listingData = await readAllListings();
    const listingsCountainer = document.querySelector('.listings-container');

    listingsCountainer.innerHTML = `
    
    `
}