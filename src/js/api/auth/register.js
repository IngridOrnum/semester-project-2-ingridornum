import {API_AUTH_REGISTER} from "../constants.js";

export async function register({ name, email, password }) {
    try {
        const response = await fetch(API_AUTH_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log('API Response:', response.status, data);

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        throw new Error('Error during registration: ' + error.message);
    }
}