import {readSingleListing} from "../../api/listings/read.js";

function formatDateTime(isoString) {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return `${formattedTime} ${formattedDate}`;
}

export async function displaySingleListing () {
    const listingId = localStorage.getItem('listingId');

    if (!listingId) {
        console.error('no listing id found');
        return;
    }

    try {
        const listing = await readSingleListing(listingId);
        const singleListingContainer = document.getElementById('single-listing-container');

        console.log(listing.data)

        singleListingContainer.innerHTML = `
<img src="${listing.data.media[0]?.url || ''}" alt="${listing.data.media[0]?.alt || 'image'}">
    <h1>${listing.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Bids</span>
            <span>${listing.data._count?.bids}</span>
        </div>
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Ends at</span>
            <span>${formatDateTime(listing.data.endsAt)}</span>
        </div>
    </div>
   <div>
          <div class="flex">
            <input class="border border-slate-900" type="text">
            <label for="text"></label>
            <button class="border border-slate-900 p-2.5">Place Bid</button>
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
    `
    } catch (error) {
        console.error('Error displaying single listing:', error);
    }
}
