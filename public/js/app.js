import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js";
import register from "./module/register.js";
import login from "./module/login.js";
import authNavbar from "./module/auth-navbar.js";
import payment from "./module/payment.js";
import forgetPassword from "./module/forget-password.js";
import fetchdata from "./module/fetchdata.js";
import resetPassword from "./module/reset-password.js";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
    Alpine.data("register", register);
    Alpine.data("login", login)
    Alpine.data('forgetPassword', forgetPassword)
    Alpine.data('authNavbar', authNavbar)
    Alpine.data('payment', payment)
    Alpine.data('fetchdata', fetchdata)
    Alpine.data('resetPassword', resetPassword)
});

Alpine.start();