import {readSingleListing} from "../../api/listings/read.js";
import {readProfile} from "../../api/profile/read.js";
import {apiBid} from "../../api/listings/bid.js";
import { formatDateTime } from "../global/listings.js";

async function getUserCredits() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    if (!loggedInUser) {
        throw new Error('No logged-in user found');
    }

    const profileData = await readProfile(loggedInUser);
    return profileData.data.credits;
}

async function getHighestBid(bids) {
    if (bids.length === 0) {
        return 0;
    }

    return Math.max(...bids.map(bid => bid.amount));
}

export async function displaySingleListing() {
    const listingId = localStorage.getItem('listingId');

    if (!listingId) {
        console.error('no listing id found');
        return;
    }

    try {
        const listing = await readSingleListing(listingId);
        const highestBid = await getHighestBid(listing.data.bids);
        const userCredits = await getUserCredits();
        const singleListingContainer = document.getElementById('single-listing-container');

        const currentTime = new Date();
        const auctionEndTime = new Date(listing.data.endsAt);
        const hasAuctionEnded = currentTime > auctionEndTime;

        const formattedEndTime = await formatDateTime(listing.data.endsAt);

        singleListingContainer.innerHTML = `
    <img src="${listing.data.media[0]?.url || "https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${listing.data.media[0]?.alt || 'image'}">
    <h1>${listing.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${highestBid} credits</span>
        </div>
        <div class="flex flex-col border border-slate-900 p-2">
        ${hasAuctionEnded
            ?
            `
            <span>Ended</span>
            <span>${formattedEndTime}</span>
            `
            :
            `
            <span>Ends at</span>
            <span>${formattedEndTime}</span>
            `
        }
        </div>
    </div>
    <div>
        <div class="flex">
        ${hasAuctionEnded
            ?
            `<div class="border border-red-600 text-red-600 p-2.5">This auction has ended.</div>`
            :
            `
            <input id="bid-amount" class="border border-slate-900" type="text" min="${highestBid + 1}" placeholder="Enter bid amount">
            <button id="place-bid-button" class="border border-slate-900 p-2.5">Place Bid</button>
            `
        }
          </div>
        <div>
            <span>Details</span>
            <div>${listing.data.description}</div>
        </div>
        <div>
            <span>Tags</span>
            <div>${listing.data.tags?.join(', ')}</div>
        </div>
    </div>
    `;

        if (!hasAuctionEnded) {
            const bidButton = document.getElementById('place-bid-button');
            bidButton.addEventListener('click', async () => {
                const bidInput = document.getElementById('bid-amount');
                const bidAmount = parseFloat(bidInput.value);

                if (isNaN(bidAmount) || bidAmount <= 0) {
                    alert('Pleace enter a valid bid amount.');
                    return;
                }

                if (bidAmount <= highestBid) {
                    alert('Your bid must be higher than the current highest bid of ${highestBid} credits.');
                    return;
                }

                if (bidAmount > userCredits) {
                    alert('You have not enough credits to place this bid.');
                    return;
                }

                console.log('Placing bid:', {listingId, bidAmount});

                try {
                    const bidResponse = await apiBid(listingId, bidAmount);
                    alert('Bid placed successfully!');
                    console.log('bid response', bidResponse);
                    location.reload();
                } catch (error) {
                    console.error(error);
                    alert('Failed to place bid. Please try again.');
                }
            });
        }
    } catch (error) {
        alert('Failed to place bid. Please try again.');
        console.error('Error displaying single listing:', error);
    }
}
