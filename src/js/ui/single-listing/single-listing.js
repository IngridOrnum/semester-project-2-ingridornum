import {readSingleListing} from "../../api/listings/read.js";
import {readProfile} from "../../api/profile/read.js";
import {apiBid} from "../../api/listings/bid.js";
import {getHighestBid, hasAuctionEnded, timeRemaining, formatDateTime} from "../global/listings.js";

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

        const loggedInUser = localStorage.getItem('loggedInUsername');
        const isUserSeller = loggedInUser === listing.data.seller.name;

        const highestBidder = listing.data.bids.length > 0
            ? listing.data.bids[listing.data.bids.length - 1].bidder // Assuming bids are sorted
            : null;
        const isHighestBidder = loggedInUser === highestBidder;

        const singleListingContainer = document.getElementById('single-listing-container');
        const auctionStatus = hasAuctionEnded(listing.data.endsAt);
        const timeLeft = timeRemaining(listing.data.endsAt);

        singleListingContainer.innerHTML = `
    <h1 class="font-heading text-2xl mb-6 tablet:text-3xl">${listing.data.title}</h1>
    <div class="flex mb-6">
        <div class="flex border border-[#C6CAC7] rounded">
            <div class="flex flex-col p-3 items-center w-[160px] gap-2">
                <span class="font-text text-ui-black tracking-wider font-medium text-xs uppercase">Highest Bid</span>
                <span class="font-heading text-ui-black text-2xl">${highestBid} credits</span>
            </div>
            <div class="w-[1px] h-full bg-[#C6CAC7]"></div>
            <div class="flex flex-col p-2 items-center w-[160px] gap-2">
                <span class="font-text text-ui-black tracking-wider font-medium text-xs uppercase">${auctionStatus ? 'Ended' : 'Ends in'}:</span>
                <span id="countdown" class="font-heading text-ui-black text-2xl">${auctionStatus ? 'Auction has ended' : timeLeft}</span>
            </div>
        </div>
    </div>
    <div>
        <div class="flex mb-6 w-[360px] justify-center">
        ${auctionStatus
            ? `<div class="border border-notif-red text-notif-red p-2.5 font-text">This auction has ended.</div>`
            : isUserSeller
                ? `<div class="border border-ui-gray text-ui-gray p-2.5 font-text">You cannot bid on your own listing.</div>`
                :
                `
                    <input id="bid-amount" class="h-[50px] outline-none border border-ui-gray rounded-l-sm font-text text-ui-black px-6" type="text" min="${highestBid + 1}" placeholder="Enter bid amount">
                    <button id="place-bid-button" class="h-[50px] border border-ui-black bg-ui-black text-ui-white font-text rounded-r-sm p-2.5">Place Bid</button>
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
        <div>${listing.data.tags.join(', ')}</div>
        `;

        const listingBidHistory = document.getElementById('listing-bid-history');

        async function updateBidHistory() {
            if (listing.data.bids.length > 0) {
                // Sort bids by the creation timestamp in ascending order
                const sortedBids = listing.data.bids.sort((a, b) => new Date(a.created) - new Date(b.created));

                const bidsWithFormattedDates = await Promise.all(sortedBids.map(async (bid, index) => {
                    const formattedDateTime = await formatDateTime(bid.created);
                    const bidStyle = index === sortedBids.length - 1 ? 'font-medium' : '';
                    return `
            <div class="h-[1px] w-full bg-primary-green"></div>
            <li class="p-2 flex gap-4 align-middle items-center">
                <div class="font-text text-[16px] w-6 h-6 text-ui-white bg-primary-green flex justify-center items-center rounded">
                    <span>${index + 1}</span>
                </div>
                <span class="font-text text-[14px] ${bidStyle}">${bid.amount} credits</span>
                <span class="font-text text-[14px] ${bidStyle}">${formattedDateTime}</span>
            </li>
            `;
                }));

                listingBidHistory.innerHTML = bidsWithFormattedDates.join('');
            } else {
                listingBidHistory.innerHTML = '<li>No bids have been placed yet.</li>';
            }
        }


        updateBidHistory();


        const listingAboutSeller = document.getElementById('listing-about-seller');
        listingAboutSeller.innerHTML += `
        <div class="flex items-center gap-4">
            <img class="rounded-full w-10 h-10 object-cover" src="${listing.data.seller.avatar.url || "public/assets/images/missing-img.jpg"}" alt="${listing.data.seller.avatar.alt || 'User Avatar'}">
            <span class="font-heading text-2xl">${listing.data.seller.name}</span>
        </div>
        <div class="flex flex-col items-center gap-6">
            <div>${listing.data.seller.bio || 'No bio available.'}</div>
            <button class="visit-profile px-14 h-[44px] bg-ui-white text-ui-black rounded-sm hover:bg-ui-black hover:text-ui-white">Visit Profile</button>
        </div>
        `;

        const visitProfile = document.querySelector('.visit-profile');
        visitProfile.addEventListener('click', () => {
            localStorage.setItem('profileUsername', listing.data.seller.name);
            window.location.href = '../../../../profile/';
        })

        function updateCarousel(media) {
            const carousel = document.getElementById('carousel');
            let imagesHtml = '';

            if (media.length > 0) {
                imagesHtml = media.map((img, index) => `
                    <img class="carousel-image" src="${img.url}" alt="${img.alt || 'Image'}" style="display: ${index === 0 ? 'block' : 'none'}">
                `).join('');

                carousel.innerHTML = imagesHtml;

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
            <button class="prev carousel-buttons flex justify-center items-center">
               <span class="rotate-180">►</span> 
            </button>
            <button class="next carousel-buttons flex justify-center items-center">
                <span>►</span>
            </button>
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

        if (!auctionStatus && !isUserSeller && !isHighestBidder) {
            const bidButton = document.getElementById('place-bid-button');

            bidButton.addEventListener('click', async () => {
                const bidInput = document.getElementById('bid-amount');
                const bidAmount = parseFloat(bidInput.value);

                if (isNaN(bidAmount) || bidAmount <= 0) {
                    alert('Please enter a valid bid amount.');
                    return;
                }

                if (bidAmount <= highestBid) {
                    alert(`Your bid must be higher than the current highest bid of ${highestBid} credits.`);
                    return;
                }

                if (bidAmount > userCredits) {
                    alert('You have not enough credits to place this bid.');
                    return;
                }

                try {
                    const bidResponse = await apiBid(listingId, bidAmount);
                    alert('Bid placed successfully!');
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

