import {apiCreateListing} from "../../api/listings/create.js";

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
        media: mediaURLInput.value.trim() ?
            [
            {
                url: mediaURLInput.value || '',
                alt: mediaDescriptionInput.value || '',
            },
        ] : [],
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
