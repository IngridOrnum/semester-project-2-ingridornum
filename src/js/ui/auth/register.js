import { register } from "../../api/auth/register.js";

export async function onRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const data = await register({username, email, password});

        if (data.data && data.data.accessToken) {
            const accessToken = data.data.accessToken;
            const username = data.data.name;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('loggedInUsername', username);

            window.location.href = '../../../../index.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    }
}