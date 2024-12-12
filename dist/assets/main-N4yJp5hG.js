import{A as L}from"./constants-BDf8nfUD.js";import"./main-Cx0DgoeT.js";import{r as u,g as $}from"./single-listing-CAqpn6nD.js";async function I(e,s=24,o=0){const t=new URLSearchParams({q:e,limit:s,offset:o}),n=await fetch(`${L}/search?${t.toString()}`);if(!n.ok)throw new Error(`Error fetching search data: ${n.status}`);const i=await n.json();return{listings:i.data||[],meta:i.meta||{}}}let g="",l=0,r=40,c=[],b=[],w=!1,v="latest";document.getElementById("select-sorting").addEventListener("change",async e=>{const s=e.target.value;l=1,c=[],await f(l,g,s)});document.querySelectorAll('input[name="filter-radio"]').forEach(e=>{e.addEventListener("change",async()=>{l=1,c=[],await f(l,g,v)})});document.getElementById("loadMore").addEventListener("click",async()=>{w||(l++,await f(l,g,v))});async function f(e=1,s="",o,t){try{let n;if(s.trim())n=await I(s,r,e);else switch(o){case"latest":n=await u(r,e,"created","desc");break;case"a-z":n=await u(r,e,"title","asc");break;case"end-soon":n=await u(r,e,"endsAt","asc");break;default:n=await u(r,e)}let i=n.listings||[];console.log("fetched listings",i),b=n.meta||[],w=i.length<r;const p=new Date;o==="popular"&&(i.sort((a,m)=>m.bids.length-a.bids.length),console.log("After Sorting:",i.map(a=>({id:a.id,title:a.title,bidsCount:a.bids.length})))),c=[...c,...i],await h(c)}catch(n){console.error("Error displaying listings:",n),await h([])}}async function h(e){const s=document.querySelector(".listings-container"),o=document.querySelectorAll(".listings-count");if(s.innerHTML="",e.length===0){s.innerHTML="<p>No listings found.</p>",o.forEach(t=>{t.innerHTML="0 of 0 listings"});return}o.forEach(t=>{t.innerHTML=`
        <span>${e.length} of ${b.totalCount}</span>
        `});for(const t of e){const n=new Date,i=new Date(t.endsAt),p=n>i,a=i-n,m=Math.floor(a/(100*60*60*24)),x=Math.floor(a%(100*60*60*24)/(1e3*60*60)),E=await $(t.bids),y=m>0?` ${m} days & ${x} hours`:` ${x} hours`,d=document.createElement("li");d.classList.add("li-single-listing"),d.setAttribute("data-id",t.id),d.innerHTML=`
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div class="flex items-center gap-4 p-2">
                    <img class="rounded-full h-10 w-10 object-cover" src="${t.seller.avatar.url||"public/assets/images/missing-img.jpeg"}" alt="Avatar User">
                    <span>${t.seller.name}</span>
                </div>
                <div>
                    ${p?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
<!--                    <div id="soon-notif" class="hidden font-text text-xs text-notif-yellow absolute m-3 top-0 right-0 px-2 py-1 border border-notif-yellow bg-notif-bg-yellow z-1 rounded-full">END SOON</div>-->
                        <img class="listing-img" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                        ${p?' <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Highest bid:</span>
                            <span>${E} credits</span>
                        </div>
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Ends in:</span>
                            <span> ${y}</span>
                        </div>
                </div>
                `}
            </div>
        `,s.appendChild(d),d.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/index.html"})}}document.getElementById("searchInput").addEventListener("input",async e=>{g=e.target.value.trim(),l=1,await f(l,g)});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});f(1);
