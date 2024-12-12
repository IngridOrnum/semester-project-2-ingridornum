import{A as L}from"./constants-BDf8nfUD.js";import"./main-Cx0DgoeT.js";import{r as $,g as A}from"./single-listing-5hPKi9NY.js";async function I(e,a=40,o=1,t="latest",i="all"){const s=new URLSearchParams({q:e,limit:a,offset:(o-1)*a,_seller:!0});t==="latest"?(s.append("sort","created"),s.append("sortOrder","desc")):t==="a-z"&&(s.append("sort","title"),s.append("sortOrder","asc")),i==="active"&&s.append("_active","true");const c={method:"GET"},n=await fetch(`${L}/search?${s.toString()}`,c);if(console.log(n),!n.ok)throw new Error(`Error fetching search data: ${n.status}`);const r=await n.json();return console.log("API response data:",r),{listings:r.data||[],meta:r.meta||{}}}let m="",d=0,v=40,l=[],u=[],w=!1,p="latest",g="all";document.querySelectorAll('input[name="filter-radio"]').forEach(e=>{e.addEventListener("change",async a=>{g=a.target.value,d=1,await h(d,m,p,g)})});document.getElementById("searchButton").addEventListener("click",async()=>{m=document.getElementById("searchInput").value.trim(),d=1,await h(d,m,p,g)});document.getElementById("select-sorting").addEventListener("change",async e=>{p=e.target.value,d=1,await h(d,m,p,g)});document.getElementById("loadMore").addEventListener("click",async()=>{w?console.log("No more listings to load"):(d++,await h(d,m,p,g))});async function h(e=1,a="",o="latest",t="all"){try{console.log("Current Sort Option:",o);let i;e===1&&(l=[]);const s=u.totalCount-l.length,c=s<v?s:v;a.trim()?i=await I(a,c,e,o,t):i=await $(c,e,o,t);let n=i.listings||[];console.log("fetched listings",n),t==="active"?(n=n.filter(r=>new Date(r.endsAt)>new Date),u.totalCount=n.length+l.length):u=i.meta||{totalCount:l.length+n.length},w=l.length+n.length>=u.totalCount,l=[...l,...n],console.log("All Listings After Load:",l),console.log("All Listings:",l),await b(l)}catch(i){console.error("Error displaying listings:",i),await b([])}}async function b(e){const a=document.querySelector(".listings-container"),o=document.querySelectorAll(".listings-count");if(a.innerHTML="",g==="active"&&(e=e.filter(t=>new Date(t.endsAt)>new Date)),e.length===0){console.log("Displaying listings:",e),a.innerHTML="<p>No listings found.</p>",o.forEach(t=>{t.innerHTML="0 of 0 listings"});return}o.forEach(t=>{t.innerHTML=`
        <span>${e.length} of ${u.totalCount}</span>
        `});for(const t of e){const i=new Date,s=new Date(t.endsAt),c=i>s,n=s-i,r=Math.floor(n/(100*60*60*24)),x=Math.floor(n%(100*60*60*24)/(1e3*60*60)),E=await A(t.bids),y=r>0?` ${r} days & ${x} hours`:` ${x} hours`,f=document.createElement("li");f.classList.add("li-single-listing"),f.setAttribute("data-id",t.id),f.innerHTML=`
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div class="flex items-center gap-4 p-2">
                    <img class="rounded-full h-10 w-10 object-cover" src="${t.seller?.avatar.url||"public/assets/images/missing-img.jpg"}" alt="Avatar User">
                    <span>${t.seller?.name}</span>
                </div>
                <div>
                    ${c?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
<!--                    <div id="soon-notif" class="hidden font-text text-xs text-notif-yellow absolute m-3 top-0 right-0 px-2 py-1 border border-notif-yellow bg-notif-bg-yellow z-1 rounded-full">END SOON</div>-->
                        <img class="listing-img" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                        ${c?' <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
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
        `,a.appendChild(f),f.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/index.html"})}}document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});h(1);
