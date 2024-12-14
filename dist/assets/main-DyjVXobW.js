import{A as x}from"./constants-BDf8nfUD.js";import"./main-btKrpKiE.js";import{r as w,g as E}from"./single-listing-Bd6m4exo.js";import{h as y,t as L}from"./input-83gozqu3.js";async function I(e,n=40,o=1,t="latest",a="all"){const s=new URLSearchParams({q:e,limit:n,offset:(o-1)*n,_seller:!0});t==="latest"?(s.append("sort","created"),s.append("sortOrder","desc")):t==="a-z"&&(s.append("sort","title"),s.append("sortOrder","asc")),a==="active"&&s.append("_active","true");const c={method:"GET"},i=await fetch(`${x}/search?${s.toString()}`,c);if(console.log("search API",`${x}?${s.toString()}`),!i.ok)throw new Error(`Error fetching search data: ${i.status}`);const p=await i.json();return console.log("API response data in search:",p),{listings:p.data||[],meta:p.meta||{}}}let g="",r=0,h=40,l=[],u=[],v=!1,m="latest",d="all";document.getElementById("filter-btn").addEventListener("click",()=>{const e=document.getElementById("filter-dropdown"),n=document.getElementById("dropdown-line");e.style.display=e.style.display==="flex"?"none":"flex",n.style.backgroundColor=n.style.backgroundColor==="rgb(198, 202, 199)"?"transparent":"rgb(198, 202, 199)"});document.querySelectorAll('input[name="filter-radio"]').forEach(e=>{e.addEventListener("change",async n=>{d=n.target.value,r=1,console.log(`Filter Value in API Call: ${d}`),await f(r,g,m,d)})});document.getElementById("searchButton").addEventListener("click",async()=>{g=document.getElementById("searchInput").value.trim(),r=1,await f(r,g,m,d)});document.getElementById("select-sorting").addEventListener("change",async e=>{m=e.target.value,r=1,await f(r,g,m,d)});document.getElementById("loadMore").addEventListener("click",async()=>{v?console.log("No more listings to load"):(r++,await f(r,g,m,d))});async function f(e=1,n="",o="latest",t="all"){try{console.log("Current Sort Option:",o);let a;e===1&&(l=[]);const s=u.totalCount-l.length,c=s<h?s:h;n.trim()?a=await I(n,c,e,o,t):a=await w(c,e,o,n,t);const i=a.listings||[];u=a.meta||{totalCount:l.length+i.length},v=l.length+i.length>=u.totalCount,l=[...l,...i],console.log("All Listings After Load:",l),console.log("All Listings:",l),await b(l)}catch(a){console.error("Error displaying listings:",a),await b([])}}async function b(e){const n=document.querySelector(".listings-container"),o=document.querySelectorAll(".listings-count");if(n.innerHTML="",d==="active"&&(e=e.filter(t=>new Date(t.endsAt)>new Date)),e.length===0){console.log("Displaying listings:",e),n.innerHTML="<p>No listings found.</p>",o.forEach(t=>{t.innerHTML="0 of 0 listings"});return}o.forEach(t=>{t.innerHTML=`
        <span>${e.length} of ${u.totalCount}</span>
        `});for(const t of e){const a=await E(t.bids),s=y(t.endsAt),c=L(t.endsAt),i=document.createElement("li");i.classList.add("li-single-listing"),i.setAttribute("data-id",t.id),i.innerHTML=`
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div class="flex items-center gap-4 p-2">
                    <img class="rounded-full h-10 w-10 object-cover" src="${t.seller?.avatar.url||"public/assets/images/missing-img.jpg"}" alt="Avatar User">
                    <span>${t.seller?.name}</span>
                </div>
                <div>
                    ${s?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
                        <img class="listing-img" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                        ${s?' <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Highest bid:</span>
                            <span>${a} credits</span>
                        </div>
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Ends in:</span>
                            <span> ${c}</span>
                        </div>
                </div>
                `}
            </div>
        `,n.appendChild(i),i.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/"})}}document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});f(1);
