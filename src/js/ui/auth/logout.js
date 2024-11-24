export function onLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedInUsername');
    alert('You logged out!')
    location.reload();
}