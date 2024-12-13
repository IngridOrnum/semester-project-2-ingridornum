import{A as w}from"./constants-BDf8nfUD.js";import"./main-DDwA7gw_.js";import{r as I,g as A}from"./single-listing-RaCnHUq1.js";/* empty css              */async function B(e,n=40,a=1,t="latest",s="all"){const i=new URLSearchParams({q:e,limit:n,offset:(a-1)*n,_seller:!0});t==="latest"?(i.append("sort","created"),i.append("sortOrder","desc")):t==="a-z"&&(i.append("sort","title"),i.append("sortOrder","asc")),s==="active"&&i.append("_active","true");const d={method:"GET"},l=await fetch(`${w}/search?${i.toString()}`,d);if(console.log("search API",`${w}?${i.toString()}`),!l.ok)throw new Error(`Error fetching search data: ${l.status}`);const g=await l.json();return console.log("API response data in search:",g),{listings:g.data||[],meta:g.meta||{}}}let m="",r=0,y=40,o=[],h=[],L=!1,u="latest",c="all";document.getElementById("filter-btn").addEventListener("click",()=>{const e=document.getElementById("filter-dropdown"),n=document.getElementById("dropdown-line");e.style.display=e.style.display==="flex"?"none":"flex",n.style.backgroundColor=n.style.backgroundColor==="rgb(198, 202, 199)"?"transparent":"rgb(198, 202, 199)"});document.querySelectorAll('input[name="filter-radio"]').forEach(e=>{e.addEventListener("change",async n=>{c=n.target.value,r=1,console.log(`Filter Value in API Call: ${c}`),await p(r,m,u,c)})});document.getElementById("searchButton").addEventListener("click",async()=>{m=document.getElementById("searchInput").value.trim(),r=1,await p(r,m,u,c)});document.getElementById("select-sorting").addEventListener("change",async e=>{u=e.target.value,r=1,await p(r,m,u,c)});document.getElementById("loadMore").addEventListener("click",async()=>{L?console.log("No more listings to load"):(r++,await p(r,m,u,c))});async function p(e=1,n="",a="latest",t="all"){try{console.log("Current Sort Option:",a);let s;e===1&&(o=[]);const i=h.totalCount-o.length,d=i<y?i:y;n.trim()?s=await B(n,d,e,a,t):s=await I(d,e,a,n,t);const l=s.listings||[];h=s.meta||{totalCount:o.length+l.length},L=o.length+l.length>=h.totalCount,o=[...o,...l],console.log("All Listings After Load:",o),console.log("All Listings:",o),await E(o)}catch(s){console.error("Error displaying listings:",s),await E([])}}async function E(e){const n=document.querySelector(".listings-container"),a=document.querySelectorAll(".listings-count");if(n.innerHTML="",c==="active"&&(e=e.filter(t=>new Date(t.endsAt)>new Date)),e.length===0){console.log("Displaying listings:",e),n.innerHTML="<p>No listings found.</p>",a.forEach(t=>{t.innerHTML="0 of 0 listings"});return}a.forEach(t=>{t.innerHTML=`
        <span>${e.length} of ${h.totalCount}</span>
        `});for(const t of e){const s=new Date,i=new Date(t.endsAt),d=s>i,l=i-s,g=Math.floor(l/(100*60*60*24)),b=Math.floor(l%(100*60*60*24)/(1e3*60*60)),v=Math.floor(l%(1e3*60*60)/(1e3*60)),$=await A(t.bids);let x="";g>0?x=`${g} days`:b>0?x=`${b} hours & ${v} minutes`:x=`${v} minutes`;const f=document.createElement("li");f.classList.add("li-single-listing"),f.setAttribute("data-id",t.id),f.innerHTML=`
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div class="flex items-center gap-4 p-2">
                    <img class="rounded-full h-10 w-10 object-cover" src="${t.seller?.avatar.url||"public/assets/images/missing-img.jpg"}" alt="Avatar User">
                    <span>${t.seller?.name}</span>
                </div>
                <div>
                    ${d?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
<!--                    <div id="soon-notif" class="hidden font-text text-xs text-notif-yellow absolute m-3 top-0 right-0 px-2 py-1 border border-notif-yellow bg-notif-bg-yellow z-1 rounded-full">END SOON</div>-->
                        <img class="listing-img" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                        ${d?' <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Highest bid:</span>
                            <span>${$} credits</span>
                        </div>
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Ends in:</span>
                            <span> ${x}</span>
                        </div>
                </div>
                `}
            </div>
        `,n.appendChild(f),f.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/index.html"})}}document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});p(1);
