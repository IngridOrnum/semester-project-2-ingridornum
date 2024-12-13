import {readProfile} from "../../api/profile/read.js";

export async function displayUserProfileInfo() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const profileData = await readProfile(loggedInUser);
    const userInfoDiv = document.getElementById('user-profile-info');

    if (userInfoDiv) {
        userInfoDiv.innerHTML = `
    <div class="flex flex-col items-center gap-4">
        <img class="w-screen h-[200px] object-cover relative" src="${profileData.data.banner.url}" alt="Profile Banner">
        <img class="w-24 h-24 rounded-full object-cover absolute z-1 top-[220px]" src="${profileData.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-black text-xl mt-8 tablet:text-3xl">${profileData.data.name}</span>
        <div class="font-text font-light text-[#727272]">${profileData.data.bio}</div>
    </div>
                `;
    }
}

export async function displayUserListings () {

}