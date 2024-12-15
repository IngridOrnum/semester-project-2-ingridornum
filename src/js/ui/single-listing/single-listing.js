import {readSingleListing} from "../../api/listings/read.js";
import {readProfile} from "../../api/profile/read.js";
import {apiBid} from "../../api/listings/bid.js";
import {getHighestBid} from "../global/listings.js";

document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', () => {
        const dropdownContent = button.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex';
    })
});

async function getUserCredits() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    if (!loggedInUser) {
        throw new Error('No logged-in user found');
    }

    const profileData = await readProfile(loggedInUser);
    return profileData.data.credits;
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

        const timeDiff = auctionEndTime - currentTime;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        let timeRemaining = '';
        if (days > 0) {
            timeRemaining = `${days} days, ${hours} hours`;
        } else if (hours > 0) {
            timeRemaining = `${hours} hours, ${minutes} minutes`;
        } else {
            timeRemaining = `${minutes} minutes`; // Less than an hour left
        }

        singleListingContainer.innerHTML = `
    <h1>${listing.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${highestBid} credits</span>
        </div>
       <div class="flex flex-col border border-slate-900 p-2">
                    <span>${hasAuctionEnded ? 'Ended' : 'Ends in'}:</span>
                    <span id="countdown">${hasAuctionEnded ? 'Auction has ended' : timeRemaining}</span>
                </div>
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
        </div>
    </div>
    `;

        const listingDetails = document.getElementById('listing-description');
        listingDetails.innerHTML += `
        <div>${listing.data.description}</div>
        `;

        const listingTags = document.getElementById('listing-tags');
        listingTags.innerHTML += `
        <div>${listing.data.tags}</div>
        `;

        const listingBidHistory = document.getElementById('listing-bid-history');
        if (listing.data.bids.length > 0) {
            listingBidHistory.innerHTML = listing.data.bids.map((bid, index) => `
                <li>
                    <span>${index + 1}</span>
                    <span>${bid.amount} credits</span>
                    <span>${bid.created}</span>
                </li>
            `).join('');
        } else {
            listingBidHistory.innerHTML = '<li>No bids have been placed yet.</li>';
        }

        const listingAboutSeller = document.getElementById('listing-about-seller');
        listingAboutSeller.innerHTML += `
        <div class="flex items-center">
            <img class="rounded-full w-10 h-10" src="${listing.data.seller.avatar.url || "public/assets/images/missing-img.jpg"}" alt="${listing.data.seller.avatar.alt || 'User Avatar'}">
            <span>${listing.data.seller.name}</span>
        </div>
        <div>${listing.data.seller.bio || 'No bio available.'}</div>
        <form action="../../../../profile/index.html">
            <button class="">Visit Profile</button>
        </form>
        `;

        function updateCarousel(media) {
            const carousel = document.getElementById('carousel');
            let imagesHtml = '';

            if (media.length > 0) {
                imagesHtml = media.map((img, index) => `
                    <img class="carousel-image" src="${img.url}" alt="${img.alt || 'Image'}" style="display: ${index === 0 ? 'block' : 'none'}">
                `).join('');

                // Update carousel HTML with the images
                carousel.innerHTML = imagesHtml;

                // Display the first image by default if only one image is present
                if (media.length > 1) {
                    addNavigationButtons();
                    setUpCarousel();
                }
            } else {
                carousel.innerHTML = `<img class="carousel-image" src="../../../../public/assets/images/missing-img.jpg" alt="No image available" style="display: block;">`;
            }
        }

        function addNavigationButtons() {
            const carousel = document.getElementById('carousel');
            carousel.insertAdjacentHTML('beforeend', `
            <button class="prev carousel-buttons">Prev</button>
            <button class="next carousel-buttons">Next</button>
            `);
        }

        function setUpCarousel() {
            const images = document.querySelectorAll('.carousel-image');
            const prevButton = document.querySelector('.prev');
            const nextButton = document.querySelector('.next');
            let currentImageIndex = 0;

            prevButton.addEventListener('click', () => {
                images[currentImageIndex].style.display = 'none';
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                images[currentImageIndex].style.display = 'block';
            });

            nextButton.addEventListener('click', () => {
                images[currentImageIndex].style.display = 'none';
                currentImageIndex = (currentImageIndex + 1) % images.length;
                images[currentImageIndex].style.display = 'block';
            });
        }

        updateCarousel(listing.data.media);

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
        console.error('Error displaying single listing:', error);
    }
}

