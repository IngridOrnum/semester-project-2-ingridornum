import {API_KEY, API_PROFILES} from "../constants.js";
import {getAccessToken} from "../auth/getAccessToken.js";

export async function readProfile(username) {
    const accessToken = await getAccessToken();
    const options = {
        method: 'GET',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${API_PROFILES}/${username}`, options)
    if (!response.ok) {
        console.error('Failed to fetch profile data:', response);
        throw new Error(`Error fetching profile data: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function readAllListingByLoggedInUser(username) {

    const accessToken = await getAccessToken();

    const options = {
        method: 'GET',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${API_PROFILES}/${username}/listings`, options)

    if (!response.ok) {
        console.error('Failed to fetch listing data:', response);
        throw new Error(`Error fetching listing data: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
}

export async function readAllWinsByUser(username) {

    const accessToken = await getAccessToken();

    const options = {
        method: 'GET',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${API_PROFILES}/${username}/wins?_listings=true`, options)

    if (!response.ok) {
        console.error('Failed to fetch listing data:', response);
        throw new Error(`Error fetching listing data: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
}

export async function readAllBidsByUser(username) {

    const accessToken = await getAccessToken();

    const options = {
        method: 'GET',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${API_PROFILES}/${username}/bids?_listings=true`, options)

    if (!response.ok) {
        console.error('Failed to fetch listing data:', response);
        throw new Error(`Error fetching listing data: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
}