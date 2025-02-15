import {searchListings} from "../../api/listings/search.js";
import {readAllListings} from "../../api/listings/read.js";
import {timeRemaining, hasAuctionEnded} from "../global/listings.js";
import {getHighestBid} from "../global/listings.js";

let currentSearchData = '';
let currentPage = 0;
let listingsPerPage = 40;
let allListings = [];
let metaData = [];
let isLastPage = false;
let sortOption = 'latest';
let filterValue = 'all';

export async function loadListings(page = 1, searchData = '', sortOption = 'latest', filterValue = 'all') {
    try {
        let response;

        if (page === 1) {
            allListings = [];
        }

        const adjustedLimit = listingsPerPage;

        if (searchData.trim()) {
            response = await searchListings(searchData, adjustedLimit, page, sortOption, filterValue);
        } else {
            response = await readAllListings(adjustedLimit, page, sortOption, searchData, filterValue);
        }

        const fetchedListings = response.listings || [];
        metaData = response.meta || {totalCount: allListings.length + fetchedListings.length};
        isLastPage = allListings.length + fetchedListings.length >= metaData.totalCount;
        allListings = [...allListings, ...fetchedListings];

        const loadMoreButton = document.getElementById('loadMore');
        loadMoreButton.disabled = isLastPage;

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
        listingsContainer.innerHTML = '<p class="text-ui-black font-subtitle text-4xl">No listings found.</p>';
        listingsCount.forEach(counter => {
            counter.innerHTML = '0 of 0 listings'
        })
        return;
    }

    listingsCount.forEach(counter => {
        counter.innerHTML = `
        <span class="text-ui-black font-text text-sm">${listings.length} of ${metaData.totalCount}</span>
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
            <div class="li-single-listing-content  flex flex-col relative cursor-pointer">
                <div class="flex items-center gap-2 tablet:gap-4 p-2">
                    <img class="rounded-full h-7 w-7 tablet:h-10 tablet:w-10 object-cover" src="${listing.seller?.avatar.url || "public/assets/images/missing-img.jpg"}" alt="Avatar User">
                    <span class="font-text text-ui-black text-sm">${listing.seller?.name}</span>
                </div>
                <div>
                    ${auctionStatus
            ?
            `<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full">ENDED</div>`
            :
            `<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full">ACTIVE</div>`
        }
                </div>
                <img class="listing-img" src="${listing.media?.[0]?.url || "public/assets/images/missing-img.jpg"}" alt="${listing.media?.[0]?.alt || "No image"}">
                <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                    <span class="flex font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${listing.title}</span>
                    ${auctionStatus
            ?
            ` <span class="uppercase border-2 flex justify-center rounded-md border-notif-red p-3 text-notif-red font-text text-xs tablet:text-base">Ended</span>`
            :
            `
                    <div class="flex gap-5 justify-center items-center">
                        <div class="flex flex-col w-[110px] tablet:w-[136px] tablet:p-[8px] items-center  py-3 border-2 border-transparent bg-primary-green text-ui-white rounded-md font-text text-xs gap-1 font-light ">
                            <span class="text[8px]  uppercase">Highest bid</span>
                            <span class="text-[14px] ">${highestBid} credits</span>
                        </div>
                        <div class="flex flex-col w-[110px] tablet:w-[136px] tablet:p-[8px] items-center py-3 border-2 border-primary-green text-ui-black rounded-md font-text text-xs gap-1 font-light ">
                            <span class="text[8px] font-medium uppercase">Ends in</span>
                            <span class="text-[14px] "> ${timeLeft}</span>
                        </div>
                    </div>
                </div>
                `
        }
            </div>
        `;
        listingsContainer.appendChild(listItem);

        listItem.addEventListener('click', () => {
            const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
            if (accessToken) {
                localStorage.setItem('listingId', listing.id);
                window.location.href = '../../../../single-listing/';
            } else {
                window.location.href = '../../../../auth/login/'
            }
        })
    }
}

document.getElementById('loadMore').addEventListener('click', async () => {
    if (!isLastPage) {
        currentPage++;
        await loadListings(currentPage, currentSearchData, sortOption, filterValue);
    } else {
        document.getElementById('loadMore').disabled = true;
    }
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

document.getElementById('filter-btn').addEventListener('click', () => {
    const filterDropdown = document.getElementById('filter-dropdown');
    const dropdownLine = document.getElementById('dropdown-line');

    filterDropdown.style.display = filterDropdown.style.display === 'flex' ? 'none' : 'flex';
    dropdownLine.style.backgroundColor = dropdownLine.style.backgroundColor === 'rgb(198, 202, 199)' ? 'transparent' : 'rgb(198, 202, 199)';
});


document.querySelectorAll('input[name="filter-radio"]').forEach(radio => {
    radio.addEventListener('change', async (event) => {
        filterValue = event.target.value;
        currentPage = 1;

        await loadListings(currentPage, currentSearchData, sortOption, filterValue);
    });
});

document.getElementById('loadMore').addEventListener('click', async () => {
    if (!isLastPage) {
        currentPage++;
        await loadListings(currentPage, currentSearchData, sortOption, filterValue);
    }
});

document.getElementById('searchButton').addEventListener('click', debounce(async () => {
    currentSearchData = document.getElementById('searchInput').value.trim();
    currentPage = 1;
    await loadListings(currentPage, currentSearchData, sortOption, filterValue);
}, 300));

document.getElementById('select-sorting').addEventListener('change', async (event) => {
    sortOption = event.target.value;
    currentPage = 1;
    await loadListings(currentPage, currentSearchData, sortOption, filterValue);
});

document.querySelectorAll('input[name="filter-radio"]').forEach(radio => {
    radio.addEventListener('change', async (event) => {
        filterValue = event.target.value;
        await loadListings(currentPage, currentSearchData, sortOption, filterValue);
    });
});

document.getElementById('loginBtn').addEventListener('click', () => {
    window.location = "auth/login/index.html";
});

document.getElementById('registerBnt').addEventListener('click', () => {
    window.location = "auth/register/index.html";
});

