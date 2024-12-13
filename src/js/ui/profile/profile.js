import {readProfile} from "../../api/profile/read.js";
import {updateProfile} from "../../api/profile/update.js";

export async function displayUserProfileInfo() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const profileData = await readProfile(loggedInUser);
    const userInfoDiv = document.getElementById('user-profile-info');

    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
    <div class="flex items-center gap-4">
    <img class="w-full h-[200px] object-cover" src="${profileData.data.banner.url}" alt="Profile Banner">
        <img class="w-10 h-10 rounded-full object-cover" src="${profileData.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-black text-xl">${profileData.data.name}</span>
    </div>
   
                `;
    }
}

export async function profileUpdateForm() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const profileData = await readProfile(loggedInUser);

    const editBtn = document.getElementById('edit-profile-btn');
    const profileUpdateForm = document.getElementById('update-profile-form');
    const bioInput = document.getElementById('bio');
    const avatarInput = document.getElementById('avatar');
    const bannerInput = document.getElementById('banner-url');

    editBtn.addEventListener('click', () => {
        profileUpdateForm.classList.add('block');
        profileUpdateForm.classList.remove('hidden')
        editBtn.classList.add('hidden');
        editBtn.classList.remove('block');
    })


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

                profileUpdateForm.classList.add('hidden');
                profileUpdateForm.classList.remove('block')
                editBtn.classList.add('block');
                editBtn.classList.remove('hidden');

            } catch (error) {
                console.error('Error updating profile:', error);
            }
        })
    }
}

export async function openCreatePage () {
    const createListingBtn = document.getElementById('create-listing-btn');
        createListingBtn.addEventListener('click', () => {
            window.location.href = '../../../../listings/create/index.html';
        })
}

export async function openEditPage () {
    const createListingBtn = document.getElementById('edit-listing-btn');
    createListingBtn.addEventListener('click', () => {
        window.location.href = '../../../../listings/edit/index.html';
    })
}