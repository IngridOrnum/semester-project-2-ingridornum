import { searchListings } from "./src/js/api/listings/search.js";
import { readAllListings } from "./src/js/api/listings/read.js";

let currentPage = 1;
const listingsPerPage = 12;
let currentSearchData = '';
let allListings = [];
let totalListings = 0;

async function displayListings(page = 1, searchData = '') {
    try {
        let response;

        if (searchData.trim()) {
            // Fetch all matching listings
            response = await searchListings(searchData);

            totalListings = response.listings?.length || 0; // Set total listings for search results

            // Limit to 12 listings per page for search
            const startIndex = (page - 1) * listingsPerPage;
            const endIndex = startIndex + listingsPerPage;
            allListings = response.listings?.slice(startIndex, endIndex) || [];
        } else {
            response = await readAllListings(listingsPerPage, page);
            allListings = response.listings || response.data || [];
            totalListings = response.totalListings || 0; // Set total listings from response
        }

        renderListings(allListings);
        updatePaginationButtons();

    } catch (error) {
        console.error('Error displaying listings:', error);
        renderListings([]);
    }
}

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

function updatePaginationButtons() {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    const totalPages = Math.ceil(totalListings / listingsPerPage);

    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= totalPages;
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

document.getElementById('searchInput').addEventListener('input', async (event) => {
    currentSearchData = event.target.value;
    currentPage = 1; // Reset to the first page for new input
    await displayListings(currentPage, currentSearchData); // Fetch listings based on input
});

displayListings(currentPage);
