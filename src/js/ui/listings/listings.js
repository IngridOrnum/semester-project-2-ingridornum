import {searchListings} from "../../api/listings/search.js";
import {readAllListings} from "../../api/listings/read.js";
import {getHighestBid} from "../single-listing/single-listing.js";

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
    const listingsCount = document.querySelectorAll('.listings-count');
    listingsContainer.innerHTML = '';

    if (listings.length === 0) {
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
        const currentTime = new Date();
        const auctionEndTime = new Date(listing.endsAt);
        const hasAuctionEnded = currentTime > auctionEndTime;
        const timeDiff = auctionEndTime - currentTime;
        const days = Math.floor(timeDiff / (100 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % ((100 * 60 * 60 * 24))) / (1000 * 60 * 60));
        const highestBid = await getHighestBid(listing.bids);

        const timeRemaining = days > 0
            ? ` ${days} days & ${hours} hours`
            : ` ${hours} hours`;

        const listItem = document.createElement('li');
        listItem.classList.add('li-single-listing');
        listItem.setAttribute('data-id', listing.id);

        listItem.innerHTML = `
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div class="flex items-center gap-4 p-2">
                    <img class="rounded-full h-10 w-10 object-cover" src="${listing.seller.avatar.url || "public/assets/images/missing-img.jpeg"}" alt="Avatar User">
                    <span>${listing.seller.name}</span>
                </div>
                <div>
                    ${hasAuctionEnded
                        ?
                        `<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>`
                        :  
                        `<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>`
                    }
                </div>
<!--                    <div id="soon-notif" class="hidden font-text text-xs text-notif-yellow absolute m-3 top-0 right-0 px-2 py-1 border border-notif-yellow bg-notif-bg-yellow z-1 rounded-full">END SOON</div>-->
                        <img class="listing-img" src="${listing.media?.[0]?.url || "public/assets/images/missing-img.jpg"}" alt="${listing.media?.[0]?.alt || "No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${listing.title}</span>
                        ${hasAuctionEnded
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
                            <span> ${timeRemaining}</span>
                        </div>
                </div>
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

