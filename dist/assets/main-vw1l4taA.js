import{A as L}from"./constants-BDf8nfUD.js";import"./main-DhbMNFkw.js";import{r as E,f as u}from"./listings-CuzQzz7Q.js";async function y(e,a=24,t=0){const n=new URLSearchParams({q:e,limit:a,offset:t}),s=await fetch(`${L}/search?${n.toString()}`);if(!s.ok)throw new Error(`Error fetching search data: ${s.status}`);const l=await s.json();return{listings:l.data||[],meta:l.meta||{}}}const d=24;let p="",i=[],g=0,h=!1;async function m(e=1,a="",t="latest"){try{let n;a.trim()?n=await y(a,d,(e-1)*d):n=await E(d,e);const s=n.listings||[],l=n.meta||{};g=l.currentPage||1,h=l.isLastPage||!1,e===1?i=s:i=[...i,...s],t==="alphabetical-a-z"?i.sort((r,o)=>r.title.localeCompare(o.title)):i.sort((r,o)=>new Date(o.created)-new Date(r.created)),console.log("Sorted Listings:",i),f(i),console.log("New Listings:",s),console.log("All Listings (Before Sort):",i),console.log("All Listings (After Sort):",i);const c=document.getElementById("loadMore");s.length<d?c.style.display="none":c.style.display="block"}catch(n){console.error("Error displaying listings:",n),f([])}}async function f(e){const a=document.querySelector(".listings-container");if(a.innerHTML="",e.length===0){a.innerHTML="<p>No listings found.</p>";return}for(const t of e){const n=new Date,s=new Date(t.endsAt),l=n>s,c=await u(t.endsAt),r=await u(t.created),o=document.createElement("li");o.classList.add("li-single-listing"),o.setAttribute("data-id",t.id),o.innerHTML=`
            <div class="li-single-listing-content border border-slate-900 p-2.5 flex flex-col">
                <img src="${t.media?.[0]?.url||"https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                <span>${t.title}</span>
                <span>Created: ${r}</span>
                ${l?`
            <span class="uppercase text-red-800">Ended</span>
            `:`
            <span>Ends at</span>
            <span>${c}</span>
            `}
               
            </div>
        `,a.appendChild(o)}document.querySelectorAll(".li-single-listing").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-id");localStorage.setItem("listingId",n),window.location.href="../../../../single-listing/index.html"})})}document.getElementById("searchInput").addEventListener("input",async e=>{p=e.target.value,g=1,await m(g,p)});document.getElementById("loadMore").addEventListener("click",async()=>{h||await m(g+1)});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});const w=document.getElementById("select-sorting");w.addEventListener("change",async()=>{const e=w.value;await m(1,p,e)});m(1);
