import {readSingleListing} from "../../api/listings/read.js";

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
        <div class="flex flex-col">
            <span>Bids</span>
            <span>${listing.data.count?.bids || '0'}</span>
        </div>
        <div class="flex flex-col">
            <span>Ends at</span>
            <span>${listing.data.endsAt}</span>
        </div>
    </div>
   <div>
          <div class="flex">
            <input class="border border-slate-900" type="text">
            <label for="text"></label>
            <button>Place Bid</button>
          </div>
          <div class="dropdown details">
            <div>
                <span>Details</span>
                <span>&#8595;</span>
            </div>
            <div>
                ${listing.data.description}
            </div>
          </div>
          <div class="dropdown tags">
            <div>
                <span>Tags</span>
                <span>&#8595;</span>
            </div>
            <div>
                ${listing.data.tags}
            </div>
          </div>
        </div>
    `
    } catch (error) {
        console.error('Error displaying single listing:', error);
    }
}