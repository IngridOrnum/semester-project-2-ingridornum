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
<div class="flex flex-col gap-4 p-2.5 mb-6">
    <div class="flex justify-between">
        <div class="flex flex-col text-ui-black font-light gap-2">
            <span class="font-subtitle text-xl">${listing.title}</span>
            ${ended
            ?
            `
            ´<span>Ended</span>
            `
            :
            `
            <div class="font-text text-sm">
                <span class="font-medium">Ends in:</span>
                <span>${timeLeft}</span>
            </div>
            `
            }
            <div class="font-text">
                <span class="font-medium text-sm">Bids:</span> 
                <span>${listing.count?.bids || '0'}</span>
            </div>
            <div class="font-text">
                <span class="font-medium text-sm">Highest Bid:</span>
                <span>${highestBid}</span>
            </div>
        </div>
        ${ended
        ?
        `
         <button class="delete-btn cursor-pointer bg-ui-black text-ui-white p-2 font-text font-light border border-transparent rounded-sm hover:border-ui-black hover:bg-ui-white hover:text-ui-black">Delete</button>
         `
        :
        `
        <div class="flex flex-col gap-4 justify-center align-middle font-text font-light">
            <button class="edit-btn cursor-pointer bg-ui-white text-ui-black p-2 border border-transparent rounded-sm hover:text-ui-white hover:bg-ui-black">Edit</button>
            <button class="delete-btn cursor-pointer bg-ui-black text-ui-white p-2 border border-transparent rounded-sm hover:border-ui-black hover:bg-ui-white hover:text-ui-black">Delete</button>
        </div>
        `
        }
        </div>
        <form class="edit-form hidden flex flex-col items-center" data-id="${listing.id}">
        <div class="line-divider bg-primary-green my-6"></div>
         <div class="flex flex-col">
        <label class="font-text text-ui-black font-light mb-2" for="edit-title">Title</label>
        <input id="edit-title" value="${listing.title}" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-title" type="text" required>
    </div>
    <div class="flex flex-col">
        <label class="font-text text-ui-black font-light mb-2" for="edit-description">Description</label>
        <input id="edit-description" value="${listing.description || ''}" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-description" type="text">
    </div>
    <div>
<div class="image-container">
                    ${listing.media.map((img, index) => `
                        <div class="image-input-set flex flex-col" data-index="${index}">
                        <div class="line-divider bg-ui-white my-4 w-full"></div>
                        <div class="flex items-center justify-between mb-2">
                            <label class="font-text text-ui-black font-light">Image URL</label>
                            <button class="remove-image-btn font-text font-light rounded-sm text-xs bg-primary-green p-1 items-center text-ui-white underline cursor-pointer hover:text-ui-black hover:bg-ui-white">Remove</button>
                        </div>
                        <input class="form-input font-text w-[280px] tablet:w-[480px] mb-4" value="${img.url}" name="edit-media-URL-${index}">
                        <label class="font-text text-ui-black font-light mb-2">Image Description</label>
                        <input class="form-input font-text w-[280px] tablet:w-[480px] mb-4" value="${img.alt}" name="edit-media-description-${index}">
                        </div>
                    `).join('')}
                </div>
    <span class="image-error-message font-text font-light text-notif-red hidden">You can only add 8 images to a listing.</span>
                <button id="add-image-btn" type="button" class="mb-6 bg-primary-green w-full p-2 font-light rounded-sm border border-transparent font-text text-ui-white hover:bg-ui-white hover:border-ui-black hover:text-ui-black">
                    + Add Another Image
                </button>
</div>

    <div class="flex flex-col">
        <label class="font-text text-ui-black font-light mb-2" for="edit-tags">Tags</label>
        <input id="edit-tags" value="${listing.tags.join(', ') || ''}" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-tags" type="text">
    </div>
    <button id="save-btn" type="submit" class="btn-primary">Save Changes</button>
        </form>
</div>
<div class="line-divider bg-primary-green"></div>
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
        }, 5000);
        return;
    }

    const index = imageInputSets.length;
    container.insertAdjacentHTML('beforeend', `
        <div class="image-input-set" data-index="${index}">
        <div class="flex items-center justify-between mb-2">
            <label class="font-text text-ui-black font-light">Image URL</label>
            <button class="remove-image-btn font-text font-light rounded-sm text-xs bg-primary-green p-1 items-center text-ui-white underline cursor-pointer hover:text-ui-black hover:bg-ui-white">Remove</button>
        </div>
            <input type="text" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-media-URL-${index}">
            <label class="font-text text-ui-black font-light">Image Description</label>
            <input type="text" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-media-description-${index}">
        </div>
    `);

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
