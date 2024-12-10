import {searchListings} from "../../api/listings/search.js";
import {readAllListings} from "../../api/listings/read.js";
import {formatDateTime} from "../global/listings.js";

let currentSearchData = '';
let currentPage = 0;
let listingsPerPage = 24;
let allListings = [];
let metaData = [];
let isLastPage = false;

export async function loadListings(page = 1, searchData = '') {
    try {
        let response;

        if (searchData.trim()) {
            response = await searchListings(searchData, listingsPerPage, page);
        } else {
            response = await readAllListings(listingsPerPage, page);
        }

        const fetchedListings = response.listings || [];
        metaData = response.meta || [];
        isLastPage = fetchedListings.length < listingsPerPage;

        allListings = [...allListings, ...fetchedListings]; // Accumulate listings
        displayListings(fetchedListings);
    } catch (error) {
        console.error('Error displaying listings:', error);
        displayListings([]);
    }
}

export async function displayListings(listings) {

    const listingsContainer = document.querySelector('.listings-container');

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

        listItem.addEventListener('click', () => {
            localStorage.setItem('listingId', listing.id);
            window.location.href = '../../../../single-listing/index.html';
        })
    }
}


document.getElementById('searchInput').addEventListener('input', async (event) => {
    currentSearchData = event.target.value.trim();
    currentPage = 1;
    await loadListings(currentPage, currentSearchData);
});

document.getElementById('loadMore').addEventListener('click', async () => {
    if (!isLastPage) {
        currentPage++;
        await loadListings(currentPage, currentSearchData);
    }

    if (isLastPage) {
        document.getElementById('loadMore').style.display = 'none'; // Hide button when no more listings
    }
});

document.getElementById('loginBtn').addEventListener('click', () => {
    window.location = "auth/login/index.html";
});

document.getElementById('registerBnt').addEventListener('click', () => {
    window.location = "auth/register/index.html";
});

