import {readAllListingByLoggedInUser, readProfile} from "../../api/profile/read.js";
import {hasAuctionEnded, timeRemaining} from "../global/listings.js";
import {getHighestBid} from "../global/listings.js";

export async function displayUserProfileInfo() {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    const profileUsername = localStorage.getItem('profileUsername');
    const usernameToUse = loggedInUsername || profileUsername;

    if (!usernameToUse) {
        console.error('no username found in localstorage');
        return;
    }

    try {
        const profileData = await readProfile(loggedInUsername);
        const userInfoDiv = document.getElementById('user-profile-info');

        if (userInfoDiv) {
            userInfoDiv.innerHTML = `
    <div class="flex flex-col items-center gap-4">
        <img class="w-screen h-[200px] object-cover relative" src="${profileData.data.banner.url}" alt="Profile Banner">
        <img class="w-24 h-24 rounded-full object-cover absolute z-1 top-[220px]" src="${profileData.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-black text-xl mt-8 tablet:text-3xl">${profileData.data.name}</span>
        <div class="font-text font-light text-[#727272]">${profileData.data.bio}</div>
    </div>
                `;

            const listings = await readAllListingByLoggedInUser(usernameToUse);
            const listingGrid = document.querySelector('.listingsGrid');
            listingGrid.innerHTML = '';

           for (const listing of listings) {
               const ended = hasAuctionEnded(listing.endsAt);
               const timeLeft = timeRemaining(listing.endsAt);
               const highestBid = await getHighestBid(listing.bids); // Assume getHighestBid or similar function or fallback

               const listingHTML = document.createElement('div');
               listingHTML.className = 'li-single-listing-content flex flex-col relative rounded-xl cursor-pointer';
               listingHTML.innerHTML = `
                 
                <div>
                    ${ended
                   ?
                   `<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>`
                   :
                   `<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>`
               }
                </div>
                        <img class="listing-img" src="${listing.media?.[0]?.url || "public/assets/images/missing-img.jpg"}" alt="${listing.media?.[0]?.alt || "No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${listing.title}</span>
                        ${ended
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
            
                `;

               listingGrid.appendChild(listingHTML);


               listingHTML.addEventListener('click', () => {
                   localStorage.setItem('listingId', listing.id);
                   window.location.href = '../../../../single-listing/';
               });
           }
        }
    } catch (error) {
        console.error('Error displaying user profile info:', error)
    }
}