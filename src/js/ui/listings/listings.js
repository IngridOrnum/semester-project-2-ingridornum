import {searchListings} from "../../api/listings/search.js";
import {readAllListings} from "../../api/listings/read.js";
import {API_LISTINGS} from "../../api/constants.js";

const listingsPerPage = 24;
let currentSearchData = '';
let allListings = [];
let currentPage = 0;
let isLastPage = false;

export async function loadListings(page = 1, searchData = '') {
    try {
        const response = await readAllListings(listingsPerPage, page);

        // if (searchData.trim()) {
        //     response = await searchListings(searchData, listingsPerPage, page);
        // } else {
        //     response = await readAllListings(listingsPerPage, page);
        // }

        const newListings = response.listings || [];
        const meta = response.meta || {};

        currentPage = meta.currentPage || 1;
        isLastPage = meta.isLastPage || false;

        if (page === 1) {
            allListings = newListings;
        } else {
            allListings = [...allListings, ...newListings];
        }

        displayListings(allListings);

        const loadMoreButton = document.getElementById('loadMore');
        if(newListings.length < listingsPerPage) {
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
    console.log('listings to display:', listings);
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
                <img src="${listing.media?.[0]?.url || "https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${listing.media?.[0]?.alt || "No image"}">
                <span>${listing.title}</span>
            </div>
        `;
        listingsContainer.appendChild(listItem);
    });

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
    await loadListings(currentOffset, currentSearchData);
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
