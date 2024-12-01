import {createListing} from "../../src/js/ui/listings/create.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-listing-form');
    if (form) {
        form.addEventListener('submit', createListing);
    }
});