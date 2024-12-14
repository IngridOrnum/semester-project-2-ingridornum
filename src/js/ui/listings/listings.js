import {searchListings} from "../../api/listings/search.js";
import {readAllListings} from "../../api/listings/read.js";
import {timeRemaining, hasAuctionEnded } from "../global/listings.js";
import {getHighestBid} from "../global/listings.js";

let currentSearchData = '';
let currentPage = 0;
let listingsPerPage = 40;
let allListings = [];
let metaData = [];
let isLastPage = false;
let sortOption = 'latest';
let filterValue = 'all';

document.getElementById('filter-btn').addEventListener('click', () => {
    const filterDropdown = document.getElementById('filter-dropdown');
    const dropdownLine = document.getElementById('dropdown-line');

    filterDropdown.style.display = filterDropdown.style.display === 'flex' ? 'none' : 'flex';
    dropdownLine.style.backgroundColor = dropdownLine.style.backgroundColor ===  'rgb(198, 202, 199)' ? 'transparent' : 'rgb(198, 202, 199)';
});

document.querySelectorAll('input[name="filter-radio"]').forEach(radio => {
    radio.addEventListener('change', async (event) => {
        filterValue = event.target.value; // Update the global filter value
        currentPage = 1; // Reset to the first page
        console.log(`Filter Value in API Call: ${filterValue}`);

        await loadListings(currentPage, currentSearchData, sortOption, filterValue);
    });
});

document.getElementById('searchButton').addEventListener('click', async () => {
    currentSearchData = document.getElementById('searchInput').value.trim();
    currentPage = 1; // Reset to the first page for a new search
    await loadListings(currentPage, currentSearchData, sortOption, filterValue); // Fetch and display the listings
});

document.getElementById('select-sorting').addEventListener('change', async (event) => {
    sortOption = event.target.value;
    currentPage = 1;
    await loadListings(currentPage, currentSearchData, sortOption, filterValue);
});

document.getElementById('loadMore').addEventListener('click', async () => {
    if (!isLastPage) {
        currentPage++;
        await loadListings(currentPage, currentSearchData, sortOption, filterValue);
    } else {
        console.log('No more listings to load');
    }
});

export async function loadListings(page = 1, searchData = '', sortOption = 'latest', filterValue = 'all') {
    try {
        console.log('Current Sort Option:', sortOption);
        let response;

        if (page === 1) {
            allListings = [];
        }

        const remainingCount = metaData.totalCount - allListings.length;
        const adjustedLimit = remainingCount < listingsPerPage ? remainingCount : listingsPerPage;

        if (searchData.trim()) {
            response = await searchListings(searchData, adjustedLimit, page, sortOption, filterValue);
        } else {
            response = await readAllListings(adjustedLimit, page, sortOption, searchData, filterValue);
        }

        const fetchedListings = response.listings || [];

        metaData = response.meta || { totalCount: allListings.length + fetchedListings.length };

        isLastPage = allListings.length + fetchedListings.length >= metaData.totalCount;

        allListings = [...allListings, ...fetchedListings];
        console.log('All Listings After Load:', allListings);

        console.log('All Listings:', allListings);
        await displayListings(allListings);
    } catch (error) {
        console.error('Error displaying listings:', error);
        await displayListings([]);
    }
}

export async function displayListings(listings) {

    const listingsContainer = document.querySelector('.listings-container');
    const listingsCount = document.querySelectorAll('.listings-count');
    listingsContainer.innerHTML = '';

    if (filterValue === 'active') {
        listings = listings.filter(listing => {
            const auctionEndTime = new Date(listing.endsAt);
            return auctionEndTime > new Date();
        });
    }

    if (listings.length === 0) {
        console.log("Displaying listings:", listings);
        listingsContainer.innerHTML = '<p>No listings found.</p>';
        listingsCount.forEach(counter => {
            counter.innerHTML = '0 of 0 listings'
        })
        return;
    }

    listingsCount.forEach(counter => {
        counter.innerHTML = `
        <span>${listings.length} of ${metaData.totalCount}</span>
        `;
    });

    for (const listing of listings) {
        const highestBid = await getHighestBid(listing.bids);
        const auctionStatus = hasAuctionEnded(listing.endsAt);
        const timeLeft = timeRemaining(listing.endsAt);

        const listItem = document.createElement('li');
        listItem.classList.add('li-single-listing');
        listItem.setAttribute('data-id', listing.id);

        listItem.innerHTML = `
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div class="flex items-center gap-4 p-2">
                    <img class="rounded-full h-10 w-10 object-cover" src="${listing.seller?.avatar.url || "public/assets/images/missing-img.jpg"}" alt="Avatar User">
                    <span>${listing.seller?.name}</span>
                </div>
                <div>
                    ${auctionStatus
                        ?
                        `<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>`
                        :  
                        `<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>`
                    }
                </div>
                        <img class="listing-img" src="${listing.media?.[0]?.url || "public/assets/images/missing-img.jpg"}" alt="${listing.media?.[0]?.alt || "No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${listing.title}</span>
                        ${auctionStatus
                        ?
                        ` <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>`
                        :
                        `
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Highest bid:</span>
                            <span>${highestBid} credits</span>
                        </div>
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Ends in:</span>
                            <span> ${timeLeft}</span>
                        </div>
                </div>
                `
                }
            </div>
        `;
        listingsContainer.appendChild(listItem);

        listItem.addEventListener('click', () => {
            localStorage.setItem('listingId', listing.id);
            window.location.href = '../../../../single-listing/';
        })
    }
}

document.getElementById('loginBtn').addEventListener('click', () => {
    window.location = "auth/login/index.html";
});

document.getElementById('registerBnt').addEventListener('click', () => {
    window.location = "auth/register/index.html";
});

