import { onLogout } from "../auth/logout.js";

export function setLogoutListener() {
    const logoutBtn = document.getElementById('logoutBtn');

    if (!logoutBtn) {
        console.log('No logout button found');
        return;
    }

    logoutBtn.addEventListener('click', function () {
        onLogout();
    });
}
