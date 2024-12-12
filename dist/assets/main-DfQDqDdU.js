import{A as E}from"./constants-BDf8nfUD.js";import"./main-Cx0DgoeT.js";import{r as L,g as $}from"./single-listing-03zzXZPj.js";async function A(e,a=40,o=1,t="latest"){const s=new URLSearchParams({q:e,limit:a,offset:(o-1)*a});t==="latest"?(s.append("sort","created"),s.append("sortOrder","desc")):t==="a-z"&&(s.append("sort","title"),s.append("sortOrder","asc"));const r={method:"GET"},n=await fetch(`${E}/search?${s.toString()}`,r);if(console.log(n),!n.ok)throw new Error(`Error fetching search data: ${n.status}`);const d=await n.json();return console.log("API response data:",d),{listings:d.data||[],meta:d.meta||{}}}let g="",l=0,h=40,i=[],p=[],v=!1,f="latest";document.getElementById("searchInput").addEventListener("input",async e=>{g=e.target.value.trim(),l=1,await m(l,g,f)});document.getElementById("select-sorting").addEventListener("change",async e=>{f=e.target.value,l=1,await m(l,g,f)});document.querySelectorAll('input[name="filter-radio"]').forEach(e=>{e.addEventListener("change",async()=>{l=1,i=[],await m(l,g,f)})});document.getElementById("loadMore").addEventListener("click",async()=>{v?console.log("No more listings to load"):(l++,await m(l,g,f))});async function m(e=1,a="",o="latest"){try{console.log("Current Sort Option:",o);let t;e===1&&(i=[]);const s=p.totalCount-i.length,r=s<h?s:h;a.trim()?t=await A(a,r,e,o):t=await L(r,e,o);const n=t.listings||[];console.log("fetched listings",n),p=t.meta||{totalCount:i.length+n.length},v=i.length+n.length>=p.totalCount,i=[...i,...n],console.log("All Listings After Load:",i),console.log("All Listings:",i),await b(i)}catch(t){console.error("Error displaying listings:",t),await b([])}}async function b(e){const a=document.querySelector(".listings-container"),o=document.querySelectorAll(".listings-count");if(a.innerHTML="",console.log("listings to display",e),e.length===0){console.log("Displaying listings:",e),a.innerHTML="<p>No listings found.</p>",o.forEach(t=>{t.innerHTML="0 of 0 listings"});return}o.forEach(t=>{t.innerHTML=`
        <span>${e.length} of ${p.totalCount}</span>
        `});for(const t of e){const s=new Date,r=new Date(t.endsAt),n=s>r,d=r-s,u=Math.floor(d/(100*60*60*24)),x=Math.floor(d%(100*60*60*24)/(1e3*60*60)),w=await $(t.bids),y=u>0?` ${u} days & ${x} hours`:` ${x} hours`,c=document.createElement("li");c.classList.add("li-single-listing"),c.setAttribute("data-id",t.id),c.innerHTML=`
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div class="flex items-center gap-4 p-2">
                    <img class="rounded-full h-10 w-10 object-cover" src="${t.seller?.avatar.url||"public/assets/images/missing-img.jpg"}" alt="Avatar User">
                    <span>${t.seller?.name}</span>
                </div>
                <div>
                    ${n?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
<!--                    <div id="soon-notif" class="hidden font-text text-xs text-notif-yellow absolute m-3 top-0 right-0 px-2 py-1 border border-notif-yellow bg-notif-bg-yellow z-1 rounded-full">END SOON</div>-->
                        <img class="listing-img" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                        ${n?' <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Highest bid:</span>
                            <span>${w} credits</span>
                        </div>
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Ends in:</span>
                            <span> ${y}</span>
                        </div>
                </div>
                `}
            </div>
        `,a.appendChild(c),c.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/index.html"})}}document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});m(1);
