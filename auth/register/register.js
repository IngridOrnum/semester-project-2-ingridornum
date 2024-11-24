import { onRegister } from "../../src/js/ui/auth/register.js";

const registerForm = document.getElementById('register-form');

registerForm.addEventListener("submit", onRegister);