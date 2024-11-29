import {apiCreateListing} from "../../api/listings/create.js";
//
// export async function createListing(event) {
//     event.preventDefault();
//
//     const form = event.target;
//     const titleInput = form["create-title"];
//     const descriptionInput = form["create-description"];
//     const mediaURLInput = form["create-media-URL"];
//     const mediaDescriptionInput = form["create-media-description"];
//     const tagsInput = form["create-tags"];
//     const endsAtInput = form["create-endsAt"];
//
//     if (!titleInput.value || !descriptionInput.value || !endsAtInput.value) {
//         alert("Please fill in all required fields.");
//         return;
//     }
//
//     const data = {
//         title: titleInput.value,
//         description: descriptionInput.value,
//         media: mediaURLInput.value ? [
//                 {
//                     url: mediaURLInput.value,
//                     alt: mediaDescriptionInput.value || "No description provided."
//                 },
//             ]
//         : [],
//         tags: tagsInput.value ? tagsInput.value.split(",").map(tag => tag.trim()) : [],
//         endsAt: new Date(endsAtInput.value).toISOString(),
//     };
//
//     console.log("Payload being sent:", data);
//
//     try {
//         const result = await apiCreateListing(data);
//
//         if (result && result.id) {
//             alert("Listing created successfully!");
//         } else {
//             alert(`Error: ${result.message || "Failed to create listing."}`);
//         }
//     } catch (error) {
//         console.error(error);
//         alert("An error occurred. Please try again.");
//     }
// }

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
        alert("Please fill in all required fields (title and end date).");
        return;
    }

    const data = {
        title: titleInput.value,
        description: descriptionInput.value || null,
        tags: tagsInput.value ? tagsInput.value.split(",").map(tag => tag.trim()) : [],
        media:
                {
                    url: mediaURLInput.value,
                    alt: mediaDescriptionInput.value || "No description provided",
                },
        endsAt: new Date(endsAtInput.value).toISOString(),
    };

    console.log("Payload being sent:", data);

    try {
        const result = await apiCreateListing(data);

        if (result && result.id) {
            alert("Listing created successfully!");
        } else {
            console.error("Unexpected result:", result);
            alert("Failed to create listing. Please check your input.");
        }
    } catch (error) {
        console.error("Error in createListing:", error.message);
        alert(`Error: ${error.message}`);
    }
}
