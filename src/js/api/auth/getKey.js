export async function getKey() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return accessToken;
    } else {
        throw new Error('AccessToken or username not found');
    }
}