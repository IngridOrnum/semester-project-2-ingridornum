import{A as m,a as f,b as p}from"./constants-DCVSafgH.js";async function h(e,n=12,t=1){const a=new URLSearchParams({q:e,limit:n,page:t}),o=await fetch(`${m}/search?${a.toString()}`);if(!o.ok)throw new Error(`Error fetching search data: ${o.status}`);const r=await o.json();return{listings:r.data||[],meta:r.meta||{}}}async function y(e=12,n=1){const t=new URLSearchParams({limit:e,page:n}),a=await fetch(`${m}?${t.toString()}`);if(!a.ok)throw new Error(`Error fetching data: ${a.status}`);const o=await a.json();return{listings:o.data||[],meta:o.meta||{}}}async function E(){const e=localStorage.getItem("accessToken");if(e)return e;throw new Error("AccessToken or username not found")}async function L(e){const n=await E(),t={headers:{"X-Noroff-API-Key":p,Authorization:`Bearer ${n}`,"Content-Type":"application/json"}},a=await fetch(`${f}/${e}`,t);if(!a.ok)throw console.error("Failed to fetch profile data:",a),new Error(`Error fetching profile data: ${a.status}`);return await a.json()}let i=1;const g=12;let l="",d=[],s={};async function c(e=1,n=""){try{let t;n.trim()?(t=await h(n,g,e),d=t.listings||[],s=t.meta||{}):(console.log("Fetching default paginated listings."),t=await y(g,e),d=t.listings||t.data||[],s=t.meta||{}),u(d),I(s),v(s)}catch(t){console.error("Error displaying listings:",t),u([])}}function u(e){const n=document.querySelector(".listings-container");if(n.innerHTML="",e.length===0){n.innerHTML="<p>No listings found.</p>";return}e.forEach(t=>{const a=document.createElement("li");a.classList.add("li-single-listing"),a.setAttribute("data-id",t.id),a.innerHTML=`
            <div class="li-single-listing-content">
                <img src="${t.media?.[0]?.url||""}" alt="${t.media?.[0]?.alt||"No image"}">
                <span>${t.title}</span>
            </div>
        `,n.appendChild(a)})}function I(e){const n=document.getElementById("prevPage"),t=document.getElementById("nextPage");n.disabled=!e.previousPage,t.disabled=!e.nextPage}function v(e){const n=document.getElementById("paginationCount"),t=Math.min(e.currentPage*g,e.totalCount);n.innerHTML=`
        <span>Showing ${t} of ${e.totalCount}</span>
    `}document.getElementById("prevPage").addEventListener("click",()=>{s.previousPage&&(i=s.previousPage,c(i,l))});document.getElementById("nextPage").addEventListener("click",()=>{s.nextPage&&(i=s.nextPage,c(i,l))});document.getElementById("searchInput").addEventListener("input",async e=>{l=e.target.value,i=1,await c(i,l)});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});c(i);async function B(){const e=localStorage.getItem("loggedInUsername"),n=document.getElementById("logoutBtn"),t=document.getElementById("loginBtn"),a=document.getElementById("registerBnt");if(e){t&&t.classList.add("hidden"),a&&a.classList.add("hidden"),n&&n.classList.remove("hidden");try{const o=await L(e),r=document.getElementById("user-display-nav");r&&(r.innerHTML=`
                <img src="${o.data.avatar.url||"/default-avatar.png"}" alt="User Avatar" style="width:40px; height:40px; border-radius:50%;">
                    <span>${o.data.name}</span>
                `)}catch(o){console.error("Error displaying user profile:",o)}}else{t&&(t.classList.remove("hidden"),t.classList.add("block")),a&&(a.classList.remove("hidden"),a.classList.add("block")),n&&n.classList.add("hidden");const o=document.getElementById("user-display-nav");o&&(o.innerHTML="")}}function w(){localStorage.removeItem("accessToken"),localStorage.removeItem("loggedInUsername"),alert("You logged out!"),location.reload()}function P(){const e=document.getElementById("logoutBtn");if(!e){console.log("No logout button found");return}e.addEventListener("click",function(){w()})}B();c();P();
