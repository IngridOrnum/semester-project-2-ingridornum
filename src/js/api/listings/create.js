import { API_LISTINGS, API_KEY } from "../constants.js";
import { getAccessToken } from "../auth/getAccessToken.js";

// export async function apiCreateListing ({ title, description, media, tags }) {
//
//     try {
//         const accessToken = localStorage.getItem('accessToken');
//         console.log(accessToken);
//
//         const options = {
//             method: 'POST',
//             headers: {
//                 'X-Noroff-API-Key': API_KEY,
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ title, description, media, tags })
//         };
//
//         const response = await fetch(API_LISTINGS, options);
//         const data = await response.json();
//
//         if (!response.ok) {
//             console.error(data.errors?.message || "Unknown error occurred.");
//             return{ok: false, message: data.errors?.message || "Failed to create listing." }
//         }
//
//         return {ok: true, data }
//
//     } catch (error) {
//         console.error("Error in apiCreateListing:", error);
//         throw error;
//     }
// }

export async function apiCreateListing({ title, description, tags, media, endsAt }) {
    try {
        const accessToken = await getAccessToken();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-Noroff-API-Key': API_KEY,
            },
            body: JSON.stringify({ title, description, tags, media, endsAt }),
        };

        console.log("Request options:", options);

        const response = await fetch(API_LISTINGS, options);
        const data = await response.json();

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Full API Error Response:", errorData); // Log the entire error object
            throw new Error(
                errorData.errors?.[0]?.message || errorData.message || "Unknown error occurred"
            );
        }


        return data; // Return success data
    } catch (error) {
        console.error("Error in apiCreateListing:", error.message);
        throw error;
    }
}
