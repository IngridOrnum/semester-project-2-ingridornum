import"./input-BRILGR-m.js";import{r as s}from"./main-CQCJvdNu.js";/* empty css               */async function a(){const e=localStorage.getItem("loggedInUsername"),t=await s(e),n=document.getElementById("userinfo-display");if(n){let i=function(){document.getElementById("open-profile-page").addEventListener("click",()=>{localStorage.setItem("profileUsername",t.data.name),window.location.href="../../../../profile/"})};n.innerHTML=`
    <div class="flex items-center gap-4">
        <img class="w-10 h-10 rounded-full object-cover tablet:w-20 tablet:h-20" src="${t.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-white text-xl tablet:text-2xl">${t.data.name}</span>
    </div>
    <div class="flex gap-6 text-ui-white align-middle">
        <div class="flex flex-col items-center gap-1">
            <span class="uppercase font-text text-xs tracking-wider">Credits</span>
            <span class="font-subtitle text-2xl">${t.data.credits}</span>
        </div>
        <div class="flex flex-col items-center gap-1">
            <span  class="uppercase font-text text-xs tracking-wider">Wins</span>
            <span class="font-subtitle text-2xl">${t.data._count?.wins||"0"}</span>
        </div>
        <div class="flex flex-col items-center gap-1">
            <span  class="uppercase font-text text-xs tracking-wider">Listings</span>
            <span class="font-subtitle text-2xl">${t.data._count?.listings||"0"}</span>
        </div>
    </div>
                `,i()}}async function l(){document.getElementById("create-listing-btn").addEventListener("click",()=>{window.location.href="../listings/create/"})}async function o(){document.getElementById("edit-listing-btn").addEventListener("click",()=>{window.location.href="../listings/edit/"})}async function c(){document.getElementById("edit-profile-btn").addEventListener("click",()=>{window.location.href="../profile/update/"})}async function d(){document.getElementById("bids-wins-btn").addEventListener("click",()=>{window.location.href="wins-and-bids/"})}a();l();o();c();d();
