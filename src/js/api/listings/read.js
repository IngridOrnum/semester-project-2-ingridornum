import {API_KEY, API_LISTINGS} from "../constants.js";
import {getKey} from "../auth/getKey.js";

// Fetch and read all listings
export async function readAllListings() {
    const response = await fetch(API_LISTINGS);

    if (!response.ok) {
        console.log('Response:', response);
        throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}

// Fetch and read single listing
