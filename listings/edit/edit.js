import {displayListingsByUser} from "../../src/js/ui/listings/update.js";
import {deleteListing} from "../../src/js/ui/listings/delete.js";

displayListingsByUser()

const listingsContainer = document.getElementById('listings-container');

if (listingsContainer) {
    listingsContainer.addEventListener('click', async (event) => {
        if(event.target && event.target.classList.contains('delete-btn')) {
            const listingId = event.target.closest('li').getAttribute('data-id');
            try {
                await deleteListing(listingId);
            } catch (error) {
                console.error('Error deleting listing:', error);
            }
        }
    });
} else {
    console.error('Listings container not found');
}
