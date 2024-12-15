import {apiUpdateListing} from "../../api/listings/update.js";
import {readAllListingByLoggedInUser} from "../../api/profile/read.js";
import {timeRemaining, hasAuctionEnded} from "../global/listings.js";
import {getHighestBid} from "../global/listings.js";

export async function displayListingsByUser() {
    try {
        const loggedInUsername = localStorage.getItem('loggedInUsername');
        const listings = await readAllListingByLoggedInUser(loggedInUsername);
        const listingsContainer = document.getElementById('listings-container');
        listingsContainer.innerHTML = '';

        listings.forEach((listing) => {
            const listItem = document.createElement('li');
            listItem.classList.add('listingByUser');
            listItem.setAttribute('data-id', listing.id);

            listItem.innerHTML = buildListingHTML(listing);
            listingsContainer.appendChild(listItem);
        });

        addEventListenersToListings(listingsContainer);
    } catch (error) {
        console.error("Error displaying user listings:", error);
        listingsContainer.innerHTML = `<p>Failed to load listings. Please try again later.</p>`;
    }
}

function buildListingHTML(listing) {
    const ended = hasAuctionEnded(listing.endsAt);
    const timeLeft = timeRemaining(listing.endsAt);
    const highestBid = getHighestBid(listing) || '0';
    return `
<div class="flex flex-col gap-4 border border-slate-900 p-2.5">
<div class="flex">
<div class="flex flex-col">
            <span>Title: ${listing.title}</span>
            ${ended
        ?
        `
                <span>Ended</span>
                `
        :
        `
                <span>Ends at: ${timeLeft}</span>
                `
    }
            <span>Bids: ${listing.count?.bids || '0'}</span>
            <span>Highest Bid: ${highestBid}</span>
        </div>
        ${ended
        ?
        `
                    <button class="delete-btn border border-slate-900 cursor-pointer">Delete</button>
                `
        :
        `

                <div class="flex gap-4">
                    <button class="edit-btn border border-slate-900 cursor-pointer">Edit</button>
                    <button class="delete-btn border border-slate-900 cursor-pointer">Delete</button>
                </div>
                `
    }
        </div>
        <form class="edit-form hidden" data-id="${listing.id}">
         <div class="flex flex-col">
        <label for="edit-title">Title</label>
        <input id="edit-title" value="${listing.title}" class="border border-slate-900" name="edit-title" type="text" required>
    </div>
    <div class="flex flex-col">
        <label for="edit-description">Description</label>
        <input id="edit-description" value="${listing.description || ''}" class="border border-slate-900" name="edit-description" type="text">
    </div>
    <div>
<div class="image-container">
                    ${listing.media.map((img, index) => `
                        <div class="image-input-set" data-index="${index}">
                            <input class="border border-ui-black" value="${img.url}" name="edit-media-URL-${index}">
                            <input class="border border-ui-black" value="${img.alt}" name="edit-media-description-${index}">
                            <button class="remove-image-btn bg-primary-green text-ui-white">Remove</button>
                        </div>
                    `).join('')}
                </div>
    <span class="image-error-message font-text font-light text-notif-red hidden">You can only add 8 images to a listing.</span>
                <button id="add-image-btn" type="button" class="bg-primary-green w-full p-2 font-light rounded-sm border border-transparent font-text text-ui-white hover:bg-ui-white hover:border-ui-black hover:text-ui-black">
                    + Add Another Image
                </button>
</div>

    <div class="flex flex-col">
        <label for="edit-tags">Tags</label>
        <input id="edit-tags" value="${listing.tags || ''}" class="border border-slate-900" name="edit-tags" type="text">
    </div>
    <button id="save-btn" type="submit" class="border border-slate-900 p-2">Save Changes</button>
        </form>
</div>
    `;
}

function addEventListenersToListings(container) {
    container.addEventListener('click', event => {
        if (event.target.classList.contains('edit-btn')) {
            const form = event.target.closest('li').querySelector('form');
            form.classList.toggle('hidden');
            initializeEditForm(form);
        } else if (event.target.classList.contains('remove-image-btn')) {
            event.target.closest('.image-input-set').remove();
            updateErrorMessageVisibility(container)
        }
    });

    container.addEventListener('submit', event => {
        event.preventDefault();
        if (event.target.classList.contains('edit-form')) {
            updateListing(event.target);
        }
    });
}

function initializeEditForm(form) {
    const container = form.querySelector('.image-container');
    const addButton = form.querySelector('#add-image-btn');
    addButton.onclick = () => addImageInput(container);
}
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-image-btn')) {
        const container = event.target.closest('.image-container');
        event.target.closest('.image-input-set').remove();  // Remove the image input set

        updateErrorMessageVisibility(container);
    }
});

function updateErrorMessageVisibility(container) {
    const imageInputSets = container.querySelectorAll('.image-input-set');
    const errorMessage = container.parentNode.querySelector('.image-error-message');

    if (imageInputSets.length < 8) {
        errorMessage.classList.add('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    } else {
        errorMessage.classList.remove('hidden');
    }
}

function addImageInput(container) {
    const imageInputSets = container.querySelectorAll('.image-input-set'); // Get current input sets
    const errorMessage = container.parentNode.querySelector('.image-error-message');

    if (imageInputSets.length >= 8) {
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 3000);
        return;
    }

    // If under the limit, add a new image input set
    const index = imageInputSets.length; // Use the current count as the index
    container.insertAdjacentHTML('beforeend', `
        <div class="image-input-set" data-index="${index}">
            <button class="remove-image-btn bg-primary-green text-ui-white">Remove</button>
            <input type="text" class="border border-ui-black" name="edit-media-URL-${index}">
            <input type="text" class="border border-ui-black" name="edit-media-description-${index}">
        </div>
    `);

    // Update error message visibility in case it was previously shown
    updateErrorMessageVisibility(container);
}


async function updateListing(form) {
    const listingId = form.getAttribute('data-id');
    const title = form.querySelector('[name="edit-title"]').value;
    const description = form.querySelector('[name="edit-description"]').value;
    const tags = form.querySelector('[name="edit-tags"]').value.split(',').map(tag => tag.trim());
    const media = Array.from(form.querySelectorAll('.image-input-set')).map(set => {
        const urlInput = set.querySelector(`input[name^="edit-media-URL-"]`);
        const descInput = set.querySelector(`input[name^="edit-media-description-"]`);
        return {
            url: urlInput ? urlInput.value : '',
            alt: descInput ? descInput.value : ''
        };
    });

    try {
        const updatedData = {title, description, tags, media};
        await apiUpdateListing(updatedData, listingId);
        alert('Listing updated successfully!');
        form.classList.add('hidden');
    } catch (error) {
        console.error('Error updating listing:', error);
        alert('Failed to update the listing. Please try again.');
    }
}
