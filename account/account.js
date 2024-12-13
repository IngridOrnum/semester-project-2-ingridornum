import {displayAccountInfo} from "../src/js/ui/account/account.js";

displayAccountInfo()

async function openCreatePage () {
    const createListingBtn = document.getElementById('create-listing-btn');
    createListingBtn.addEventListener('click', () => {
        window.location.href = '../listings/create/';
    })
}

async function openEditPage () {
    const createListingBtn = document.getElementById('edit-listing-btn');
    createListingBtn.addEventListener('click', () => {
        window.location.href = '../listings/edit/';
    })
}

async function openEditProfile () {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    editProfileBtn.addEventListener('click', () => {
        window.location.href = '../profile/update/';
    })
}

async function openBidsWns () {
    const bidsWinsBtn = document.getElementById('bids-wins-btn');
    bidsWinsBtn.addEventListener('click', () => {
        window.location.href = '../profile/bids-wins/';
    })
}

openCreatePage()
openEditPage()
openEditProfile()
openBidsWns()