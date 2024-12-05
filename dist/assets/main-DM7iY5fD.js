import{A as f}from"./constants-BDf8nfUD.js";import"./main-DhbMNFkw.js";import{r as h,f as E}from"./listings-C9RmsADW.js";async function w(e,i=24,t=0){const n=new URLSearchParams({q:e,limit:i,offset:t}),s=await fetch(`${f}/search?${n.toString()}`);if(!s.ok)throw new Error(`Error fetching search data: ${s.status}`);const a=await s.json();return{listings:a.data||[],meta:a.meta||{}}}const l=24;let g="",o=[],c=0,p=!1;async function d(e=1,i=""){try{let t;i.trim()?t=await w(i,l,(e-1)*l):t=await h(l,e);const n=t.listings||[],s=t.meta||{};c=s.currentPage||1,p=s.isLastPage||!1,e===1?o=n:o=[...o,...n],m(o);const a=document.getElementById("loadMore");n.length<l?a.style.display="none":a.style.display="block"}catch(t){console.error("Error displaying listings:",t),m([])}}async function m(e){const i=document.querySelector(".listings-container");if(i.innerHTML="",e.length===0){i.innerHTML="<p>No listings found.</p>";return}for(const t of e){const n=new Date,s=new Date(t.endsAt),a=n>s,u=await E(t.endsAt),r=document.createElement("li");r.classList.add("li-single-listing"),r.setAttribute("data-id",t.id),r.innerHTML=`
            <div class="li-single-listing-content border border-slate-900 p-2.5">
                <img src="${t.media?.[0]?.url||"https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                <span>${t.title}</span>
                ${a?`
            <span class="uppercase text-red-800">Ended</span>
            `:`
            <span>Ends at</span>
            <span>${u}</span>
            `}
                <span>Seller: ${t.seller.name}</span>
            </div>
        `,i.appendChild(r)}document.querySelectorAll(".li-single-listing").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-id");localStorage.setItem("listingId",n),window.location.href="../../../../single-listing/index.html"})})}document.getElementById("searchInput").addEventListener("input",async e=>{g=e.target.value,c=1,await d(c,g)});document.getElementById("loadMore").addEventListener("click",async()=>{p||await d(c+1)});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});d(1);
