import {readProfile} from "../../api/profile/read.js";
import {onLogout} from "../auth/logout.js";

export async function displayUserNav() {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBnt');
    const accountAndMenu = document.getElementById('account-menu');

    if (loggedInUser) {

        if (loginBtn) loginBtn.classList.add('hidden');
        if (registerBtn) registerBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        if (accountAndMenu) accountAndMenu.classList.remove('hidden');

        try {
            const profileData = await readProfile(loggedInUser);
            const userDisplayNav = document.getElementById('user-display-nav');

            if (userDisplayNav) {
                userDisplayNav.innerHTML = `
<button class="absolute top-5 right-5 tablet:top-10 tablet:right-10 h-12 w-12">
    <img id="close-dropdown-btn" class="h-10 w-10 transition ease-in-out delay-150 hover:scale-110 duration-300" src="../../../../public/assets/icons/nav/close.svg" alt="close icon">
</button>
<div class="flex flex-col items-center gap-2">
    <div class="flex items-center gap-4">
        <img src="${profileData.data.avatar.url || '/default-avatar.png'}" alt="User Avatar" class="h-12 w-12 rounded-full object-cover">
        <span class="font-light text-2xl font-heading text-ui-white">${profileData.data.name}</span>
    </div>
    <div class="font-text font-light text-ui-white pt-4 gap-1">
        <span class="font-semibold">Your credits:</span>
        <span>${profileData.data.credits}</span>
    </div>
            </div> 
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../account/">My Account</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../listings/create/">Create Listing</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../listings/edit/">Edit Listings</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../account/wins-and-bids/">My Bids & Wins</a></button>
           
                `;
                const closeDropdownBtn = document.getElementById('close-dropdown-btn');
                if (closeDropdownBtn) {
                    closeDropdownBtn.addEventListener('click', () => {
                        const dropdownMenu = document.getElementById('menu-dropdown');
                        dropdownMenu.classList.add('hidden');
                    });
                }
            }
        } catch (error) {
            console.error('Error displaying user profile:', error)
        }
    } else {
        if (loginBtn) {
            loginBtn.classList.remove('hidden');
            loginBtn.classList.add('block');
        }
        if (registerBtn) {
            registerBtn.classList.remove('hidden');
            registerBtn.classList.add('block');
        }
        if (logoutBtn) logoutBtn.classList.add('hidden');
        if (accountAndMenu) accountAndMenu.classList.add('hidden');

        // Clear user display section
        const userDisplayNav = document.getElementById('user-display-nav');
        if (userDisplayNav) userDisplayNav.innerHTML = '';
    }
}

export async function openAccountPage() {
    document.getElementById('my-account').addEventListener('click', () => {
        window.location.href = '../../../../account/';
    });
}

export async function openMenuDropdown() {
    const dropdownMenu = document.getElementById('menu-dropdown');
    const menuBtn = document.getElementById('menu-btn');

    menuBtn.addEventListener('click', () => {
        toggleDropDown(dropdownMenu);
    })

    function toggleDropDown(dropdownMenu) {
        if (dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.remove('hidden');
            setTimeout(() => dropdownMenu.classList.remove('opacity-0'), 10);
        } else {
            dropdownMenu.classList.add('hidden');
        }
    }
}
