import { API_KEY, API_PROFILES } from "../constants.js";
import { getAccessToken } from "../auth/getAccessToken.js";

export async function updateProfile(username, updatedData) {
    const accessToken = await getAccessToken();
    const options = {
        method: 'PUT',
        headers: {
            'X-Noroff-API-Key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    };

    const response = await fetch(`${API_PROFILES}/${username}`, options);
    if (!response.ok) {
        console.error('Failed to update profile data:', response);
        throw new Error(`Error updating profile data: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
