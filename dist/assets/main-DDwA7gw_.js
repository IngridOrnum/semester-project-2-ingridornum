import{d as c,c as d}from"./constants-BDf8nfUD.js";async function l(){const e=localStorage.getItem("accessToken");if(e)return e;throw new Error("AccessToken or username not found")}async function u(e){const s=await l(),n={method:"GET",headers:{"X-Noroff-API-Key":d,Authorization:`Bearer ${s}`,"Content-Type":"application/json"}},t=await fetch(`${c}/${e}`,n);if(!t.ok)throw console.error("Failed to fetch profile data:",t),new Error(`Error fetching profile data: ${t.status}`);return await t.json()}function g(){localStorage.removeItem("accessToken"),localStorage.removeItem("loggedInUsername"),alert("You logged out!"),window.location="../../../../"}async function f(){const e=localStorage.getItem("loggedInUsername"),s=document.getElementById("logoutBtn"),n=document.getElementById("loginBtn"),t=document.getElementById("registerBnt"),a=document.getElementById("account-menu");if(e){n&&n.classList.add("hidden"),t&&t.classList.add("hidden"),s&&s.classList.remove("hidden"),a&&a.classList.remove("hidden");try{const o=await u(e),i=document.getElementById("user-display-nav");if(i){i.innerHTML=`
<button class="absolute top-5 right-5 tablet:top-10 tablet:right-10 h-12 w-12">
    <img id="close-dropdown-btn" class="h-10 w-10 transition ease-in-out delay-150 hover:scale-110 duration-300" src="../../../../public/assets/icons/nav/close.svg" alt="close icon">
</button>
<div class="flex flex-col items-center gap-2">
    <div class="flex items-center gap-4">
        <img src="${o.data.avatar.url||"/default-avatar.png"}" alt="User Avatar" class="h-12 w-12 rounded-full object-cover">
        <span class="font-light text-2xl font-heading text-ui-white">${o.data.name}</span>
    </div>
    <div class="font-text font-light text-ui-white pt-4 gap-1">
        <span class="font-semibold">Your credits:</span>
        <span>${o.data.credits}</span>
    </div>
            </div> 
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../account/">My Account</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../listings/create/">Create Listing</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../listings/edit/">Edit Listings</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="">My Bids & Wins</a></button>
           
                `;const r=document.getElementById("close-dropdown-btn");r&&r.addEventListener("click",()=>{document.getElementById("menu-dropdown").classList.add("hidden")})}}catch(o){console.error("Error displaying user profile:",o)}}else{n&&(n.classList.remove("hidden"),n.classList.add("block")),t&&(t.classList.remove("hidden"),t.classList.add("block")),s&&s.classList.add("hidden"),a&&a.classList.add("hidden");const o=document.getElementById("user-display-nav");o&&(o.innerHTML="")}}async function h(){document.getElementById("my-account").addEventListener("click",()=>{window.location.href="../../../../account/"})}async function m(){const e=document.getElementById("menu-dropdown");document.getElementById("menu-btn").addEventListener("click",()=>{n(e)});function n(t){t.classList.contains("hidden")?(t.classList.remove("hidden"),setTimeout(()=>t.classList.remove("opacity-0"),10)):t.classList.add("hidden")}}function p(){const e=document.getElementById("logoutBtn");if(!e){console.log("No logout button found");return}e.addEventListener("click",function(){g()})}async function b(){f(),p(),h(),m()}b();export{l as g,u as r};
