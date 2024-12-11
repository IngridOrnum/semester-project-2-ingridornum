import {searchListings} from "../../api/listings/search.js";
import {readAllListings} from "../../api/listings/read.js";
import {formatDateTime} from "../global/listings.js";

let currentSearchData = '';
let currentPage = 0;
let listingsPerPage = 40;
let allListings = [];
let metaData = [];
let isLastPage = false;
let sortOption = 'latest';

document.getElementById('select-sorting').addEventListener('change', async (event) => {
    const sortOption = event.target.value;
    currentPage = 1;
    allListings = [];
    await loadListings(currentPage, currentSearchData, sortOption);
});

document.querySelectorAll('input[name="filter-radio"]').forEach(radio => {
    radio.addEventListener('change', async () => {
        currentPage = 1;
        allListings = [];
        await loadListings(currentPage, currentSearchData, sortOption);
    });
});

document.getElementById('loadMore').addEventListener('click', async () => {
    if (!isLastPage) {
        currentPage++;
        await loadListings(currentPage, currentSearchData, sortOption);
    }
});


export async function loadListings(page = 1, searchData = '', sortOption, filterValue) {
    try {

        let response;

        if (searchData.trim()) {
            response = await searchListings(searchData, listingsPerPage, page);
        } else {
            switch (sortOption) {
                case 'latest':
                    response = await readAllListings(listingsPerPage, page, 'created', 'desc');
                    break;
                case 'a-z':
                    response = await readAllListings(listingsPerPage, page, 'title', 'asc');
                    break;
                case 'end-soon':
                    response = await readAllListings(listingsPerPage, page, 'endsAt', 'asc');
                    break;
                default:
                    response = await readAllListings(listingsPerPage, page)
            }
        }

        let fetchedListings = response.listings || [];

        console.log('fetched listings', fetchedListings);
        metaData = response.meta || [];
        isLastPage = fetchedListings.length < listingsPerPage;

        const currentTime = new Date();
        if (filterValue === 'active') {
            fetchedListings = fetchedListings.filter(listing => new Date(listing.endsAt) > currentTime);
        } else if (filterValue === 'ended') {
            fetchedListings = fetchedListings.filter(listing => new Date(listing.endsAt) <= currentTime);
        }

        if (sortOption === 'popular') {
            fetchedListings.sort((a, b) => b.bids.length - a.bids.length);

            console.log("After Sorting:", fetchedListings.map(listing => ({
                id: listing.id,
                title: listing.title,
                bidsCount: listing.bids.length,
            })));
        }

        allListings = [...allListings, ...fetchedListings]; // append new listings

        await displayListings(allListings);
    } catch (error) {
        console.error('Error displaying listings:', error);
        await displayListings([]);
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

document.getElementById('loginBtn').addEventListener('click', () => {
    window.location = "auth/login/index.html";
});

document.getElementById('registerBnt').addEventListener('click', () => {
    window.location = "auth/register/index.html";
});

