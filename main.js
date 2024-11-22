import {searchListings} from "./src/js/api/listings/search.js";

let currentPage = 1;
const listingsPerPage = 12;
let currentSearchData = '';
let allListings = [];

// Display listings on the page
async function displayListings(page = 1, searchData = '') {
    try {
        if (searchData) {
            // Use the search endpoint for global search
            const response = await searchListings(searchData);
            allListings = response.data; // Update allListings with search results
        } else {
            // Use paginated listings for non-search scenarios
            const response = await searchListings('', listingsPerPage, page);
            allListings = response.data;
        }
        renderListings(allListings);
    } catch (error) {
        console.error('Error displaying listings:', error);
    }
}

// Render listings
function renderListings(listings) {
    const listingsContainer = document.querySelector('.listings-container');
    listingsContainer.innerHTML = '';

    if (listings.length === 0) {
        listingsContainer.innerHTML = '<p>No listings found.</p>';
        return;
    }

    listings.forEach((listing) => {
        const listItem = document.createElement('li');
        listItem.classList.add('li-single-listing');
        listItem.setAttribute('data-id', listing.id);

        listItem.innerHTML = `
            <div class="li-single-listing-content">
                <img src="${listing.media?.[0]?.url || ""}" alt="${listing.media?.[0]?.alt || "No image"}">
                <span>${listing.title}</span>
            </div>
        `;
        listingsContainer.appendChild(listItem);
    });
}

// Pagination controls
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayListings(currentPage, currentSearchData);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    displayListings(currentPage, currentSearchData);
});

// Search input event listener
document.getElementById('searchInput').addEventListener('input', async (event) => {
    currentSearchData = event.target.value;
    currentPage = 1; // Reset to first page for new search
    await displayListings(currentPage, currentSearchData); // Fetch global search results
});

// Initial call to display listings
displayListings(currentPage);
