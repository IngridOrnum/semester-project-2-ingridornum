import {apiCreateListing} from "../../api/listings/create.js";

document.getElementById('add-image-btn').addEventListener('click', () => {
    const imgContainer = document.getElementById('image-inputs-container');
    const newIndex = imgContainer.querySelectorAll('.image-input-set').length;
    const errorMessage = document.getElementById('image-error-message');

    errorMessage.classList.add('hidden');

    if (newIndex >= 8) {
        errorMessage.classList.remove('hidden')
    } else {
        const newInputHTML = `
                    <div class="image-input-set flex flex-col">
                    <div class="line-divider bg-ui-white my-4"></div>
                        <div class="flex items-center justify-between">
                            <label for="create-media-URL-${newIndex}">Image URL</label>
                            <button type="button" class="remove-image-btn font-text text-xs bg-primary-green p-1 items-center text-ui-white underline cursor-pointer">Remove</button>
                        </div>
                        <input class="border border-slate-900" id="create-media-URL-${newIndex}" name="create-media-URL-${newIndex}" type="text">
                        <label for="create-media-description-${newIndex}">Image Description</label>
                        <input class="border border-slate-900" id="create-media-description-${newIndex}" name="create-media-description-${newIndex}" type="text">
                    </div>
        `;
        imgContainer.insertAdjacentHTML("beforeend", newInputHTML);
    }
});

document.getElementById('image-inputs-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-image-btn')) {
        const imageInputSet = event.target.closest('.image-input-set');
        if (imageInputSet) {
            imageInputSet.remove();
        }
    }
});

function collectImageData (form) {
    const media = [];
    const imageInputs = document.querySelectorAll('#image-inputs-container .image-input-set');
    imageInputs.forEach((inputSet, index) => {
        const urlInput = form[`create-media-URL-${index}`];
        const descInput = form[`create-media-description-${index}`];
        if (urlInput && urlInput.value.trim()) {
            media.push({
                url: urlInput.value,
                alt: descInput.value || '',
            });
        }
    });
    return media
}

export async function createListing(event) {
    event.preventDefault();

    const form = event.target;
    const titleInput = form["create-title"];
    const descriptionInput = form["create-description"];
    const mediaURLInput = form["create-media-URL"];
    const mediaDescriptionInput = form["create-media-description"];
    const tagsInput = form["create-tags"];
    const endsAtInput = form["create-endsAt"];

    if (!titleInput.value || !endsAtInput.value) {
        alert("Please fill in all required fields.");
        return;
    }

    const listingData = {
        title: titleInput.value,
        description: descriptionInput.value || "No description provided.",
        media: collectImageData(form),
        tags: tagsInput.value ? tagsInput.value.split(",").map(tag => tag.trim()) : [],
        endsAt: new Date(endsAtInput.value).toISOString(),
    };

    console.log("Payload being sent:", listingData);

    try {
        const {data: responseData, ok} = await apiCreateListing(listingData);

        if (ok) {
            alert('Listing created successfully!')
            location.reload();
        } else {
            console.error("Error response from API:", responseData.errors[0].message);
            alert(`Error: ${responseData.errors[0].message || "Failed to create listing."}`);
        }

    } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again.");
    }
}
