import { searchListings } from "./src/js/api/listings/search.js";
import { readAllListings } from "./src/js/api/listings/read.js";
import { readProfile } from "./src/js/api/profile/read.js";

let currentPage = 1;
const listingsPerPage = 12;
let currentSearchData = '';
let allListings = [];
let metaData = {};

async function displayListings(page = 1, searchData = '') {
    try {
        let response;

        if (searchData.trim()) {
            response = await searchListings(searchData, listingsPerPage, page);
            allListings = response.listings || [];
            metaData = response.meta || {};
        } else {
            console.log('Fetching default paginated listings.');
            response = await readAllListings(listingsPerPage, page);
            allListings = response.listings || response.data || [];
            metaData = response.meta || {};
        }
        renderListings(allListings);
        updatePaginationButtons(metaData);
        updatePaginationCount(metaData)
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


function updatePaginationButtons(meta) {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    // Disable buttons if meta is missing
    prevButton.disabled = !meta.previousPage;
    nextButton.disabled = !meta.nextPage;
}

function updatePaginationCount(meta) {
    const paginationDivCounter = document.getElementById('paginationCount');

    // Calculate the current range of displayed listings
    const end = Math.min(meta.currentPage * listingsPerPage, meta.totalCount);

    paginationDivCounter.innerHTML = `
        <span>Showing ${end} of ${meta.totalCount}</span>
    `;
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (metaData.previousPage) {
        currentPage = metaData.previousPage;
        displayListings(currentPage, currentSearchData);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (metaData.nextPage) {
        currentPage = metaData.nextPage;
        displayListings(currentPage, currentSearchData);
    }
});

document.getElementById('searchInput').addEventListener('input', async (event) => {
    currentSearchData = event.target.value;
    currentPage = 1;
    await displayListings(currentPage, currentSearchData);
});

document.getElementById('loginBtn').addEventListener('click', () => {
    window.location = "auth/login/index.html";
});

document.getElementById('registerBnt').addEventListener('click', () => {
    window.location = "auth/register/index.html";
});

async function displayUser () {
    const loggedInUser = localStorage.getItem('loggedInUsername');

    if (loggedInUser) {
        try {
            const profileData = await readProfile(loggedInUser);

            const userDisplayNav = document.getElementById('user-display-nav');

            if (userDisplayNav) {
                userDisplayNav.innerHTML = `
                <img src="${profileData.data.avatar.url || '/default-avatar.png'}" alt="User Avatar" style="width:40px; height:40px; border-radius:50%;">
                    <span>${profileData.data.name}</span>
                `;
            }
        } catch (error) {
            console.error('Error displaying user profile:', error)
        }
    }
}

displayUser();

displayListings(currentPage);

