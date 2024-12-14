import {apiUpdateListing} from "../../api/listings/update.js";
import {readAllListingByLoggedInUser} from "../../api/profile/read.js";

export async function displayListingsByUser() {
    try {
        const listings = await readAllListingByLoggedInUser();

        const listingsContainer = document.getElementById('listings-container');
        listingsContainer.innerHTML = '';

        listings.forEach((listing) => {
            const listItem = document.createElement('li');
            listItem.classList.add('listingByUser');
            listItem.setAttribute('data-id', listing.id);

            listItem.innerHTML = `

<div class="flex flex-col gap-4 border border-slate-900 p-2.5">
<div class="flex">
<div class="flex flex-col">
            <span>Title: ${listing.title}</span>
            <span>Ends at: ${listing.endsAt}</span>
            <span>Bids: ${listing.count?.bids || '0'}</span>
        </div>
        <div class="flex gap-4">
            <button class="edit-btn border border-slate-900 cursor-pointer">Edit</button>
            <button class="delete-btn border border-slate-900 cursor-pointer">Delete</button>
        </div>
        </div>
        <form class="edit-form hidden" data-id="${listing.id}">
         <div>
        <label for="edit-title">Title</label>
        <input id="edit-title" value="${listing.title}" class="border border-slate-900" name="edit-title" type="text" required>
    </div>
    <div>
        <label for="edit-description">Description</label>
        <input id="edit-description" value="${listing.description || ''}" class="border border-slate-900" name="edit-description" type="text">
    </div>
    <div>
        <label for="edit-media-URL">Image URL</label>
        <input id="edit-media-URL" value="${listing.media.url || ''}" class="border border-slate-900" name="edit-media-URL" type="text">
    </div>
    <div>
        <label for="edit-media-description">Image Description</label>
        <input id="edit-media-description" value="${listing.media.alt || ''}" class="border border-slate-900" name="edit-media-description" type="text">
    </div>
    <div>
        <label for="edit-tags">Tags</label>
        <input id="edit-tags" value="${listing.tags || ''}" class="border border-slate-900" name="edit-tags" type="text">
    </div>
    <button id="save-btn" type="submit" class="border border-slate-900 p-2">Save Changes</button>
        </form>
</div>
      `;
            listingsContainer.appendChild(listItem);
        });

        listingsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-btn')) {
                const listingId = event.target.closest('li').getAttribute('data-id');
                toggleEditForm(listingId);
            }
        });

        function toggleEditForm(listingId) {
            const form = document.querySelector(`form[data-id="${listingId}"]`);
            form.classList.toggle('hidden');
        }

        listingsContainer.addEventListener('submit', (event) => {
            if (event.target.classList.contains('edit-form')) {
                updateListing(event);
            }
        });
    } catch (error) {
        console.error("Error displaying user listings:", error);
        listingsContainer.innerHTML = `<p>Failed to load listings. Please try again later.</p>`;
    }
}

export async function updateListing(event) {
    event.preventDefault();

    const form = event.target.closest('form');
    const listingId = form.getAttribute('data-id');

    const mediaUrl = form.querySelector(`#edit-media-URL`).value.trim();
    const mediaAlt = form.querySelector(`#edit-media-description`).value.trim();

    const updatedData = {
        title: form.querySelector(`#edit-title`).value.trim(),
        description: form.querySelector(`#edit-description`).value.trim() || undefined,
        tags: form.querySelector(`#edit-tags`).value.split(',').map(tag => tag.trim()),
        media: mediaUrl ? [
            {
                url: mediaUrl,
                alt: mediaAlt,
            }
        ] : undefined,
    }

    try {
        await apiUpdateListing(updatedData, listingId);
        alert('Listing updated successfully!');
        form.classList.add('hidden'); // Hide the form after saving
    } catch (error) {
        console.error('Error updating listing:', error);
        alert('Failed to update the listing. Please try again.');
    }
}
