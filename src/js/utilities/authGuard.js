export function authGuard() {
    if (!localStorage.accessToken) {
        alert("Please login to view and bid on listings");
        window.location.href = "/auth/login/";
    }
}