export function onLogout() {
    localStorage.removeItem('accessToken');
    alert('You logged out!')
    location.reload();
}