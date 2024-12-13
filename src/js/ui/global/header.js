import {readProfile} from "../../api/profile/read.js";

export async function displayUserNav () {
    const loggedInUser = localStorage.getItem('loggedInUsername');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBnt');

    if (loggedInUser) {

        if(loginBtn) loginBtn.classList.add('hidden');
        if(registerBtn) registerBtn.classList.add('hidden');
        if(logoutBtn) logoutBtn.classList.remove('hidden');

        try {
            const profileData = await readProfile(loggedInUser);
            const userDisplayNav = document.getElementById('user-display-nav');

            if (userDisplayNav) {
                userDisplayNav.innerHTML = `
<div id="my-profile" class="items-center">
    <div class="flex items-center gap-4">
        <img src="${profileData.data.avatar.url || '/default-avatar.png'}" alt="User Avatar" class="h-10 w-10 rounded-full object-cover">
        <span class="font-light font-heading text-ui-white">${profileData.data.name}</span>
    </div>
    <span class="font-text font-light text-ui-white pt-4">Your credits: ${profileData.data.credits}</span>
</div> 
                `;
            }
        } catch (error) {
            console.error('Error displaying user profile:', error)
        }
    } else {
        if (loginBtn) {
            loginBtn.classList.remove('hidden');
            loginBtn.classList.add('block'); // Optional if you need to ensure it's visible
        }
        if (registerBtn) {
            registerBtn.classList.remove('hidden');
            registerBtn.classList.add('block'); // Optional if you need to ensure it's visible
        }
        if (logoutBtn) logoutBtn.classList.add('hidden');

        // Clear user display section
        const userDisplayNav = document.getElementById('user-display-nav');
        if (userDisplayNav) userDisplayNav.innerHTML = '';
    }
}

export async function openProfilePage() {
    document.body.addEventListener('click', (event) => {
        if (event.target.closest('#my-profile')) {
            window.location.href = '../../../../profile/index.html';
        }
    });
}