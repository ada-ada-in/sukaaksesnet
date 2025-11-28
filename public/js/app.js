import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js";
import register from "./module/register.js";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
    Alpine.data("register", register);
});

Alpine.start();