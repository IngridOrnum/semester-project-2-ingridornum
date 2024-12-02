import {apiDeleteListing} from "../../api/listings/delete.js";


export async function deleteListing(listingId) {

    if (!listingId) {
        console.error('No listing ID was found');
        return;
    }

    if (confirm('Are you sure you want to delete this post?')) {
        try {
            const response = await apiDeleteListing(listingId);
            if (response.ok) {
                alert('Listing successfully deleted!')
                location.reload();
            } else {
                alert('Failed to delete listing.')
            }
        } catch (error) {
            console.error('Error deleting listing:', error);
            alert('An error occurred while deleting listing')
        }
    }
}