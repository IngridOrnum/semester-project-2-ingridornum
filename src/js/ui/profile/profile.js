import {readProfile} from "../../api/profile/read.js";
import {updateProfile} from "../../api/profile/update.js";

export async function displayUserProfileInfo() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const profileData = await readProfile(loggedInUser);
    const userInfoDiv = document.getElementById('user-profile-info');

    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
<span>Welcome, ${profileData.data.name}!</span>
<div class="flex gap-6">
<span>Credits: ${profileData.data.credits}</span>
<span>Listings: ${profileData.data.count?.listings || "No listings yet."}</span>
<span>Wins: ${profileData.data.count?.wins || "No wins yet."}</span>
</div>
<div>${profileData.data.bio}</div>
                `;
    }
}

export async function profileUpdateForm() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const profileData = await readProfile(loggedInUser);

    const profileUpdateForm = document.getElementById('update-profile-form');
    const bioInput = document.getElementById('bio');
    const avatarInput = document.getElementById('avatar');
    const bannerInput = document.getElementById('banner-url');

    if (bioInput) bioInput.value = profileData.data.bio || '';
    if (avatarInput) avatarInput.value = profileData.data.avatar?.url || '';
    if (bannerInput) bannerInput.value = profileData.data.banner?.url || '';

    if (profileUpdateForm) {
        profileUpdateForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const updatedData = {
                bio: bioInput.value,
                avatar: {url: avatarInput.value},
                banner: {url: bannerInput.value},
            };

            try {
                const updatedProfile = await updateProfile(loggedInUser, updatedData);
                console.log('Profile updated successfully:', updatedProfile);
                await displayUserProfileInfo();
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        })
    }
}
