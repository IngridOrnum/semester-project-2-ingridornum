export async function getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return accessToken;
    } else {
        throw new Error('AccessToken or username not found');
    }
}