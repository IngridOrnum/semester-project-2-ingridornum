import {API_KEY, API_LISTINGS} from "../constants.js";
import {getAccessToken} from "../auth/getAccessToken.js";

export async function apiBid(listingId, bidAmount) {
    const accessToken = await getAccessToken();

    const options = {
        method: 'POST',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({amount: bidAmount})
    };

    console.log('Sending API request to:', `${API_LISTINGS}/${listingId}/bids`, options);

    const response = await fetch(`${API_LISTINGS}/${listingId}/bids`, options);
    if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Failed to place bid:', response.status, response.statusText, errorDetails);
        throw new Error(`Error placing bid: ${response.status}`);
    }
    const data = await response.json();
    return data;
}