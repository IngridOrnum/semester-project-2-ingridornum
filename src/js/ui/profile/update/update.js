import {readProfile} from "../../../api/profile/read.js";
import {updateProfile} from "../../../api/profile/update.js";
import {displayUserProfileInfo} from "../profile.js";

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
                alert('Profile updated successfully!');
                await displayUserProfileInfo();

            } catch (error) {
                console.error('Error updating profile:', error);
            }
        })
    }
}