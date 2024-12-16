import{d as i,c as r}from"./input-CPdIg46K.js";async function c(){const e=localStorage.getItem("accessToken");if(e)return e;throw new Error("AccessToken or username not found")}async function u(e){const o=await c(),n={method:"GET",headers:{"X-Noroff-API-Key":r,Authorization:`Bearer ${o}`,"Content-Type":"application/json"}},t=await fetch(`${i}/${e}`,n);if(!t.ok)throw console.error("Failed to fetch profile data:",t),new Error(`Error fetching profile data: ${t.status}`);return await t.json()}async function v(e){const o=await c(),n={method:"GET",headers:{"X-Noroff-API-Key":r,Authorization:`Bearer ${o}`,"Content-Type":"application/json"}},t=await fetch(`${i}/${e}/listings`,n);if(!t.ok)throw console.error("Failed to fetch listing data:",t),new Error(`Error fetching listing data: ${t.status}`);return(await t.json()).data}async function E(e){const o=await c(),n={method:"GET",headers:{"X-Noroff-API-Key":r,Authorization:`Bearer ${o}`,"Content-Type":"application/json"}},t=await fetch(`${i}/${e}/wins?_listings=true`,n);if(!t.ok)throw console.error("Failed to fetch listing data:",t),new Error(`Error fetching listing data: ${t.status}`);return(await t.json()).data}async function B(e){const o=await c(),n={method:"GET",headers:{"X-Noroff-API-Key":r,Authorization:`Bearer ${o}`,"Content-Type":"application/json"}},t=await fetch(`${i}/${e}/bids?_listings=true`,n);if(!t.ok)throw console.error("Failed to fetch listing data:",t),new Error(`Error fetching listing data: ${t.status}`);return(await t.json()).data}function f(){localStorage.clear(),alert("You logged out!"),window.location="../../../../"}async function h(){const e=localStorage.getItem("loggedInUsername"),o=document.getElementById("logoutBtn"),n=document.getElementById("loginBtn"),t=document.getElementById("registerBnt"),s=document.getElementById("account-menu");if(e){n&&n.classList.add("hidden"),t&&t.classList.add("hidden"),o&&o.classList.remove("hidden"),s&&s.classList.remove("hidden");try{const a=await u(e),d=document.getElementById("user-display-nav");if(d){d.innerHTML=`
<button class="absolute top-5 right-5 tablet:top-10 tablet:right-10 h-12 w-12">
    <img id="close-dropdown-btn" class="h-10 w-10 transition ease-in-out delay-150 hover:scale-110 duration-300" src="../../../../public/assets/icons/nav/close.svg" alt="close icon">
</button>
<div class="flex flex-col items-center gap-2">
    <div class="flex items-center gap-4">
        <img src="${a.data.avatar.url||"/default-avatar.png"}" alt="User Avatar" class="h-12 w-12 rounded-full object-cover">
        <span class="font-light text-2xl font-heading text-ui-white">${a.data.name}</span>
    </div>
    <div class="font-text font-light text-ui-white pt-4 gap-1">
        <span class="font-semibold">Your credits:</span>
        <span>${a.data.credits}</span>
    </div>
            </div> 
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../account/">My Account</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../listings/create/">Create Listing</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../listings/edit/">Edit Listings</a></button>
            <button class="border border-[#F7F7F750] rounded-sm p-2 text-ui-white font-light font-text hover:bg-ui-white hover:border-transparent hover:text-ui-black w-[160px]"><a href="../../../../account/wins-and-bids/">My Bids & Wins</a></button>
           
                `;const l=document.getElementById("close-dropdown-btn");l&&l.addEventListener("click",()=>{document.getElementById("menu-dropdown").classList.add("hidden")})}}catch(a){console.error("Error displaying user profile:",a)}}else{n&&(n.classList.remove("hidden"),n.classList.add("block")),t&&(t.classList.remove("hidden"),t.classList.add("block")),o&&o.classList.add("hidden"),s&&s.classList.add("hidden");const a=document.getElementById("user-display-nav");a&&(a.innerHTML="")}}async function g(){document.getElementById("my-account").addEventListener("click",()=>{window.location.href="../../../../account/"})}async function p(){const e=document.getElementById("menu-dropdown");document.getElementById("menu-btn").addEventListener("click",()=>{n(e)});function n(t){t.classList.contains("hidden")?(t.classList.remove("hidden"),setTimeout(()=>t.classList.remove("opacity-0"),10)):t.classList.add("hidden")}}function m(){const e=document.getElementById("logoutBtn");if(!e){console.log("No logout button found");return}e.addEventListener("click",function(){f()})}async function w(){h(),m(),g(),p()}w();export{v as a,B as b,E as c,c as g,u as r};
