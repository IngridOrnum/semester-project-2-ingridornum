import {readAllBidsByUser, readAllWinsByUser} from "../../../api/profile/read.js";
import { hasAuctionEnded, timeRemaining, formatDateTime} from "../../global/listings.js";

export async function displayBidsByUser() {
    const bidsContainer = document.querySelector('.bids-container');
    const usernameToUse = localStorage.getItem('loggedInUsername');
    const listings = await readAllBidsByUser(usernameToUse);
    const uniqueListings = new Map();

    bidsContainer.innerHTML = '';

    for (const listing of listings) {
        if (uniqueListings.has(listing.listing.id)) {
            continue;
        }
        uniqueListings.set(listing.listing.id, true);


        const auctionStatus = hasAuctionEnded(listing.listing.endsAt);
        const timeLeft = timeRemaining(listing.listing.endsAt);

        const bidListing = document.createElement('li');
        bidListing.classList.add('li-single-listing');
        bidListing.setAttribute('data-id', listing.id);

        console.log(listing)

        bidListing.innerHTML = `
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div>
                    ${auctionStatus
                        ?
                        `<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3  mt-4 top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>`
                        :
                        `<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-4 top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>`
                    }
                </div>
                <img class="object-cover w-full h-[200px] tablet:h-[220px] justify-center" src="${listing.listing.media?.[0]?.url || "public/assets/images/missing-img.jpg"}" alt="${listing.listing.media?.[0]?.alt || "No image"}">
                <div class="flex flex-col gap-2 p-2 tablet:gap-4 tablet:p-4">
                    <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${listing.listing.title}</span>
                    ${auctionStatus
                    ?
                    ` <span class="uppercase border-2 flex justify-center rounded-md border-notif-red p-3 text-notif-red font-text text-xs tablet:text-base">Ended</span>`
                    :
                    `
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Amount of bids:</span>
                            <span>${listing.amount}</span>
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
        bidsContainer.appendChild(bidListing);

        bidListing.addEventListener('click', () => {
            localStorage.setItem('listingId', listing.listing.id);
            window.location.href = '../../single-listing/';
        })
    }
}

export async function displayWinsByUser() {
    const winsContainer = document.querySelector('.wins-container');
    const usernameToUse = localStorage.getItem('loggedInUsername');
    const listings = await readAllWinsByUser(usernameToUse);

    winsContainer.innerHTML = '';

    for (const listing of listings) {
        const winsListing = document.createElement('li');
        winsListing.classList.add('li-single-listing');
        winsListing.setAttribute('data-id', listing.id);
        const formattedDateTime = await formatDateTime(listing.endsAt);

        winsListing.innerHTML = `
            <div class="flex flex-col relative rounded-xl">
                
                <img class="object-cover w-full h-[200px] tablet:h-[220px] justify-center" src="${listing.media?.[0]?.url || "public/assets/images/missing-img.jpg"}" alt="${listing.media?.[0]?.alt || "No image"}">
                <div class="flex flex-col gap-2 p-2 tablet:gap-4 tablet:p-4 min-h-[112px]">
                    <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${listing.title}</span>
                    <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                    <span class="font-medium">Amount of bids</span>
                       <span>${listing._count.bids}</span>
                </div>
                    <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                        <span class="font-medium">Ended:</span>
                       <span>${formattedDateTime}</span>
                    </div>
                </div>
            </div>
        `;
        winsContainer.appendChild(winsListing);

        winsListing.addEventListener('click', () => {
            localStorage.setItem('listingId', listing.id);
            window.location.href = '../../single-listing/';
        })
    }
}