import{A as b}from"./constants-BDf8nfUD.js";import"./main-B4YcYq6j.js";import{r as y}from"./read-bf7At211.js";import{g as v,h as w,t as E}from"./listings-Ubj3QYyM.js";/* empty css              */async function L(t,n=40,s=1,e="latest",a="all"){const i=new URLSearchParams({q:t,limit:n,offset:(s-1)*n,_seller:!0,_bids:!0});e==="latest"?(i.append("sort","created"),i.append("sortOrder","desc")):e==="a-z"&&(i.append("sort","title"),i.append("sortOrder","asc")),a==="active"&&i.append("_active","true");const d={method:"GET",headers:{"Content-Type":"application/json"}},l=await fetch(`${b}/search?${i.toString()}`,d);if(console.log("search API",`${b}?${i.toString()}`),!l.ok)throw new Error(`Error fetching search data: ${l.status}`);const f=await l.json();return console.log("API response data in search:",f),{listings:f.data||[],meta:f.meta||{}}}let c="",o=0,I=40,p=[],x=[],m=!1,g="latest",r="all";async function u(t=1,n="",s="latest",e="all"){try{let a;t===1&&(p=[]);const i=I;n.trim()?a=await L(n,i,t,s,e):a=await y(i,t,s,n,e);const d=a.listings||[];x=a.meta||{totalCount:p.length+d.length},m=p.length+d.length>=x.totalCount,p=[...p,...d];const l=document.getElementById("loadMore");l.disabled=m,await h(p)}catch(a){console.error("Error displaying listings:",a),await h([])}}async function h(t){const n=document.querySelector(".listings-container"),s=document.querySelectorAll(".listings-count");if(n.innerHTML="",r==="active"&&(t=t.filter(e=>new Date(e.endsAt)>new Date)),t.length===0){console.log("Displaying listings:",t),n.innerHTML='<p class="text-ui-black font-subtitle text-4xl">No listings found.</p>',s.forEach(e=>{e.innerHTML="0 of 0 listings"});return}s.forEach(e=>{e.innerHTML=`
        <span class="text-ui-black font-text text-sm">${t.length} of ${x.totalCount}</span>
        `});for(const e of t){const a=await v(e.bids),i=w(e.endsAt),d=E(e.endsAt),l=document.createElement("li");l.classList.add("li-single-listing"),l.setAttribute("data-id",e.id),l.innerHTML=`
            <div class="li-single-listing-content  flex flex-col relative cursor-pointer">
                <div class="flex items-center gap-2 tablet:gap-4 p-2">
                    <img class="rounded-full h-7 w-7 tablet:h-10 tablet:w-10 object-cover" src="${e.seller?.avatar.url||"public/assets/images/missing-img.jpg"}" alt="Avatar User">
                    <span class="font-text text-ui-black text-sm">${e.seller?.name}</span>
                </div>
                <div>
                    ${i?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full">ACTIVE</div>'}
                </div>
                <img class="listing-img" src="${e.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${e.media?.[0]?.alt||"No image"}">
                <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                    <span class="flex font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${e.title}</span>
                    ${i?' <span class="uppercase border flex justify-center rounded-md border-notif-red p-3 text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                    <div class="flex gap-5 justify-center items-center">
                        <div class="flex flex-col w-[110px] tablet:w-[136px] tablet:p-[8px] items-center  py-3 border-2 border-transparent bg-primary-green text-ui-white rounded-md font-text text-xs gap-1 font-light ">
                            <span class="text[8px]  uppercase">Highest bid</span>
                            <span class="text-[14px] ">${a} credits</span>
                        </div>
                        <div class="flex flex-col w-[110px] tablet:w-[136px] tablet:p-[8px] items-center py-3 border-2 border-primary-green text-ui-black rounded-md font-text text-xs gap-1 font-light ">
                            <span class="text[8px] font-medium uppercase">Ends in</span>
                            <span class="text-[14px] "> ${d}</span>
                        </div>
                    </div>
                </div>
                `}
            </div>
        `,n.appendChild(l),l.addEventListener("click",()=>{localStorage.setItem("listingId",e.id),window.location.href="../../../../single-listing/"})}}document.getElementById("loadMore").addEventListener("click",async()=>{m?(console.log("No more listings to load"),document.getElementById("loadMore").disabled=!0):(o++,await u(o,c,g,r))});function B(t,n){let s;return function(...a){const i=()=>{clearTimeout(s),t(...a)};clearTimeout(s),s=setTimeout(i,n)}}document.getElementById("filter-btn").addEventListener("click",()=>{const t=document.getElementById("filter-dropdown"),n=document.getElementById("dropdown-line");t.style.display=t.style.display==="flex"?"none":"flex",n.style.backgroundColor=n.style.backgroundColor==="rgb(198, 202, 199)"?"transparent":"rgb(198, 202, 199)"});document.querySelectorAll('input[name="filter-radio"]').forEach(t=>{t.addEventListener("change",async n=>{r=n.target.value,o=1,console.log(`Filter Value in API Call: ${r}`),await u(o,c,g,r)})});document.getElementById("loadMore").addEventListener("click",async()=>{m?console.log("No more listings to load"):(o++,await u(o,c,g,r))});document.getElementById("searchButton").addEventListener("click",B(async()=>{c=document.getElementById("searchInput").value.trim(),o=1,await u(o,c,g,r)},300));document.getElementById("select-sorting").addEventListener("change",async t=>{g=t.target.value,o=1,await u(o,c,g,r)});document.querySelectorAll('input[name="filter-radio"]').forEach(t=>{t.addEventListener("change",async n=>{r=n.target.value,await u(o,c,g,r)})});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});u(1);
