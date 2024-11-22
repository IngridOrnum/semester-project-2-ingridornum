// import {authGuard} from "./src/js/utilities/authGuard.js";
import { readAllListings } from "./src/js/api/listings/read.js";

// authGuard();

let currentPage = 1;
const listingsPerPage = 12;

async function displayListings (page = 1) {
    try {
        const listings = await readAllListings(listingsPerPage, page);
        const listingsContainer = document.querySelector('.listings-container');
        listingsContainer.innerHTML = '';

        listings.data.forEach((listing) => {
            const listItem = document.createElement('li');
            listItem.classList.add('li-single-listing');
            listItem.setAttribute('data-id', listing.id);

            listItem.innerHTML =  `
    <div class="li-single-listing-content">
        <img src="${listing.media?.[0]?.url || ""}" alt="${listing.media?.[0]?.alt || "No image"}">
    </div>
    `;
            listingsContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error displaying listings:', error)
    }
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayListings(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage ++;
    displayListings(currentPage);
})

displayListings(12, 1);