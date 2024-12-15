import {readProfile} from "../../api/profile/read.js";

export async function displayAccountInfo() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const profileData = await readProfile(loggedInUser);
    const userInfoDiv = document.getElementById('userinfo-display');

    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
    <div class="flex items-center gap-4">
        <img class="w-10 h-10 rounded-full object-cover tablet:w-20 tablet:h-20" src="${profileData.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-white text-xl tablet:text-2xl">${profileData.data.name}</span>
    </div>
    <div class="flex gap-6 text-ui-white align-middle">
        <div class="flex flex-col items-center gap-1">
            <span class="uppercase font-text text-xs tracking-wider">Credits</span>
            <span class="font-subtitle text-2xl">${profileData.data.credits}</span>
        </div>
        <div class="flex flex-col items-center gap-1">
            <span  class="uppercase font-text text-xs tracking-wider">Wins</span>
            <span class="font-subtitle text-2xl">${profileData.data._count?.wins || "0"}</span>
        </div>
        <div class="flex flex-col items-center gap-1">
            <span  class="uppercase font-text text-xs tracking-wider">Listings</span>
            <span class="font-subtitle text-2xl">${profileData.data._count?.listings || "0"}</span>
        </div>
    </div>
                `;
        function openProfilePage () {
            const profilePageBtn = document.getElementById('open-profile-page');
            profilePageBtn.addEventListener('click', () => {
                localStorage.setItem('profileUsername', profileData.data.name);
                window.location.href = `../../../../profile/`;
            })
        }
        openProfilePage()
    }
}

export async function openCreatePage () {
    const createListingBtn = document.getElementById('create-listing-btn');
    createListingBtn.addEventListener('click', () => {
        window.location.href = '../listings/create/';
    })
}

export async function openEditPage () {
    const createListingBtn = document.getElementById('edit-listing-btn');
    createListingBtn.addEventListener('click', () => {
        window.location.href = '../listings/edit/';
    })
}

export async function openEditProfile () {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    editProfileBtn.addEventListener('click', () => {
        window.location.href = '../profile/update/';
    })
}

export async function openBidsWns () {
    const bidsWinsBtn = document.getElementById('bids-wins-btn');
    bidsWinsBtn.addEventListener('click', () => {
        window.location.href = 'wins-and-bids/';
    })
}