import { searchListings } from "../../api/listings/search.js";
import { readAllListings, fetchAllListings } from "../../api/listings/read.js";
import { formatDateTime } from "../global/listings.js";

const listingsPerPage = 24;
let currentSearchData = '';
let allListings = [];
let currentPage = 0;
let isLastPage = false;

export async function loadListings(page = 1, searchData = '', sortBy = 'latest') {
    try {
        let allListings;

        if (page === 1 && !currentSearchData) {
            allListings = await fetchAllListings();
        } else if (currentSearchData) {
            const response = await searchListings(currentSearchData, 1000);
            allListings = response.listings;
        } else {
            const response = await readAllListings(24, page);
            allListings = [...allListings, ...response.listings];
        }

        if(sortBy === 'alphabetical-a-z') {
            allListings.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            // Default: Sort by created date (latest first)
            allListings = sortByCreated(allListings);
        }

        console.log('Sorted Listings:', allListings);

        // Paginate locally (24 listings per page)
        const start = (page - 1) * 24;
        const end = page * 24;
        const paginatedListings = allListings.slice(start, end);

        displayListings(paginatedListings);

        const loadMoreButton = document.getElementById('loadMore');
        if(end >= allListings.length) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'block';
        }
    } catch (error) {
        console.error('Error displaying listings:', error);
        displayListings([]);
    }
}

export async function displayListings(listings) {

    const listingsContainer = document.querySelector('.listings-container');
    listingsContainer.innerHTML = '';

    if (listings.length === 0) {
        listingsContainer.innerHTML = '<p>No listings found.</p>';
        return;
    }

    for (const listing of listings) {
        const currentTime = new Date();
        const auctionEndTime = new Date(listing.endsAt);
        const hasAuctionEnded = currentTime > auctionEndTime;

        const formattedEndTime = await formatDateTime(listing.endsAt);
        const formattedCreateTime = await formatDateTime(listing.created);

        const listItem = document.createElement('li');
        listItem.classList.add('li-single-listing');
        listItem.setAttribute('data-id', listing.id);

        listItem.innerHTML = `
            <div class="li-single-listing-content border border-slate-900 p-2.5 flex flex-col">
                <img src="${listing.media?.[0]?.url || "https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${listing.media?.[0]?.alt || "No image"}">
                <span>${listing.title}</span>
                <span>Created: ${formattedCreateTime}</span>
                ${hasAuctionEnded
            ?
            `
            <span class="uppercase text-red-800">Ended</span>
            `
            :
            `
            <span>Ends at</span>
            <span>${formattedEndTime}</span>
            `
        }
               
            </div>
        `;
        listingsContainer.appendChild(listItem);
    }

    document.querySelectorAll('.li-single-listing').forEach((singleListing) => {
        singleListing.addEventListener('click', () => {
            const listingId = singleListing.getAttribute('data-id');
            localStorage.setItem('listingId', listingId);
            window.location.href = '../../../../single-listing/index.html';
        })
    })
}

document.getElementById('searchInput').addEventListener('input', async (event) => {
    currentSearchData = event.target.value;
    currentPage = 1;
    await loadListings(currentPage, currentSearchData);
});

document.getElementById('loadMore').addEventListener('click', async () => {
   if (!isLastPage) {
       await loadListings(currentPage + 1);
   }
});

document.getElementById('loginBtn').addEventListener('click', () => {
    window.location = "auth/login/index.html";
});

document.getElementById('registerBnt').addEventListener('click', () => {
    window.location = "auth/register/index.html";
});

function sortByCreated(listings) {
    return listings.sort((a, b) => new Date(b.created) - new Date(a.created));
}

const sortSelector = document.getElementById('select-sorting');

sortSelector.addEventListener('change', async () => {
    const selectedSort = sortSelector.value;

    await loadListings(1, currentSearchData, selectedSort);
});
