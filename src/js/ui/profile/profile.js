import {readProfile} from "../../api/profile/read.js";

export async function displayUserProfileInfo() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const profileData = await readProfile(loggedInUser);
    const userInfoDiv = document.getElementById('user-profile-info');

    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
<span>Welcome, ${profileData.data.name}!</span>
<span>Your Credits: ${profileData.data.credits}</span>
                `;
    }
}