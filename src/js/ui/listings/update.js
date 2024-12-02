import {apiUpdateListing} from "../../api/listings/update.js";
import {readSingleListing} from "../../api/listings/read.js";
import {readAllListingByUser} from "../../api/profile/read.js";

export async function displayListingsByUser() {
    try {
        const listings = await readAllListingByUser();

        const listingsContainer = document.getElementById('listings-container');
        listingsContainer.innerHTML = '';

        console.log("Listings data type:", Array.isArray(listings));
        if (!Array.isArray(listings)) {
            throw new Error("Listings is not an array");
        }

        listings.forEach((listing) => {
            const listItem = document.createElement('li');
            listItem.classList.add('listingByUser');
            listItem.setAttribute('data-id', listing.id);

            listItem.innerHTML = `
      
        <span>${listing.title}</span>
        <button id="edit-btn" class="border border-slate-900 cursor-pointer">Edit</button>
        <button id="delete-btn" class="border border-slate-900 cursor-pointer">Delete</button>
      
      `;
            listingsContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error displaying user listings:", error);
        // listingsContainer.innerHTML = `<p>Failed to load listings. Please try again later.</p>`;
    }
}

export async function updateListing(event) {

}