import{A as m}from"./constants-C6fMtq7-.js";import"./main-a4CFLtnG.js";import{r as p}from"./read-CVpjR93P.js";async function h(e,n=12,t=1){const i=new URLSearchParams({q:e,limit:n,page:t}),l=await fetch(`${m}/search?${i.toString()}`);if(!l.ok)throw new Error(`Error fetching search data: ${l.status}`);const g=await l.json();return{listings:g.data||[],meta:g.meta||{}}}let s=1;const d=12;let r="",c=[],a={};async function o(e=1,n=""){try{let t;n.trim()?(t=await h(n,d,e),c=t.listings||[],a=t.meta||{}):(console.log("Fetching default paginated listings."),t=await p(d,e),c=t.listings||t.data||[],a=t.meta||{}),u(c),f(a),E(a)}catch(t){console.error("Error displaying listings:",t),u([])}}async function u(e){const n=document.querySelector(".listings-container");if(n.innerHTML="",e.length===0){n.innerHTML="<p>No listings found.</p>";return}e.forEach(t=>{const i=document.createElement("li");i.classList.add("li-single-listing"),i.setAttribute("data-id",t.id),i.innerHTML=`
            <div class="li-single-listing-content">
                <img src="${t.media?.[0]?.url||""}" alt="${t.media?.[0]?.alt||"No image"}">
                <span>${t.title}</span>
            </div>
        `,n.appendChild(i)}),document.querySelectorAll(".li-single-listing").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-id");localStorage.setItem("listingId",i),window.location.href="../../../../single-listing/index.html"})})}function f(e){const n=document.getElementById("prevPage"),t=document.getElementById("nextPage");n.disabled=!e.previousPage,t.disabled=!e.nextPage}function E(e){const n=document.getElementById("paginationCount"),t=Math.min(e.currentPage*d,e.totalCount);n.innerHTML=`
        <span>Showing ${t} of ${e.totalCount}</span>
    `}document.getElementById("prevPage").addEventListener("click",()=>{a.previousPage&&(s=a.previousPage,o(s,r))});document.getElementById("nextPage").addEventListener("click",()=>{a.nextPage&&(s=a.nextPage,o(s,r))});document.getElementById("searchInput").addEventListener("input",async e=>{r=e.target.value,s=1,await o(s,r)});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});o(s);o();
