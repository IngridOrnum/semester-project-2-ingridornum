import {readProfile} from "../../api/profile/read.js";

export async function displayUser () {
    const loggedInUser = localStorage.getItem('loggedInUsername');

    if (loggedInUser) {
        try {
            const profileData = await readProfile(loggedInUser);

            const userDisplayNav = document.getElementById('user-display-nav');

            if (userDisplayNav) {
                userDisplayNav.innerHTML = `
                <img src="${profileData.data.avatar.url || '/default-avatar.png'}" alt="User Avatar" style="width:40px; height:40px; border-radius:50%;">
                    <span>${profileData.data.name}</span>
                `;
            }
        } catch (error) {
            console.error('Error displaying user profile:', error)
        }
    }
}