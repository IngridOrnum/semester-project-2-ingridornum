export function onLogout() {
    localStorage.clear();
    alert('You logged out!')
    window.location = '../../../../'
}