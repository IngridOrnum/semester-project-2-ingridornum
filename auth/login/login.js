import { onLogin } from "../../src/js/ui/auth/login.js";

const loginForm = document.getElementById('login-form');

loginForm.addEventListener("submit", onLogin);