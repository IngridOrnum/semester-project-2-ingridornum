import { register } from "../../api/auth/register.js";
import {login} from "../../api/auth/login.js";

export async function onRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const usernameAlert = document.getElementById('username-alert');
    const email = document.getElementById('email').value;
    const emailAlert = document.getElementById('email-alert');
    const password = document.getElementById('password').value;
    const passwordAlert = document.getElementById('password-alert');

    let isValid = true;


    if (!/^[a-zA-Z0-9_]{3,}$/.test(username)) {
        usernameAlert.classList.remove('hidden');
        isValid = false;
    } else {
        usernameAlert.classList.add('hidden');
    }

    if (!/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email)) {
        emailAlert.classList.remove('hidden');
        isValid = false;
    } else {
        emailAlert.classList.add('hidden');
    }

    if (password.length < 8) {
        passwordAlert.classList.remove('hidden');
        isValid = false;
    } else {
        passwordAlert.classList.add('hidden');
    }

    if (!isValid) {
        return;
    }

    try {
        const registerData = await register({name: username, email, password});

        if (registerData.data) {

            const loginData = await login({email, password})

            if(loginData.data && loginData.data.accessToken) {
                const accessToken = loginData.data.accessToken;
                const loggedInUsername = loginData.data.name;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('loggedInUsername', loggedInUsername);

                window.location.href = '../../../../index.html';
            } else {
                alert('Login failed after registration. Please log in manually');
            }
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred. Please try again later.');
    }
}

export async function openLoginPage () {
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', () => {
        window.location.href = '../../../../auth/login/index.html';
    });
}