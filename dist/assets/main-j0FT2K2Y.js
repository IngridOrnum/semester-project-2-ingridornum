import{A as L}from"./constants-BDf8nfUD.js";import"./main-DhbMNFkw.js";import{r as m}from"./read-B4I6VCJF.js";async function $(t,s=24,l=0){const n=new URLSearchParams({q:t,limit:s,offset:l}),e=await fetch(`${L}/search?${n.toString()}`);if(!e.ok)throw new Error(`Error fetching search data: ${e.status}`);const i=await e.json();return{listings:i.data||[],meta:i.meta||{}}}let g="",a=0,r=40,c=[],w=[],v=!1,E="latest";document.getElementById("select-sorting").addEventListener("change",async t=>{const s=t.target.value;a=1,c=[],await f(a,g,s)});document.querySelectorAll('input[name="filter-radio"]').forEach(t=>{t.addEventListener("change",async()=>{a=1,c=[],await f(a,g,E)})});document.getElementById("loadMore").addEventListener("click",async()=>{v||(a++,await f(a,g,E))});async function f(t=1,s="",l,n){try{let e;if(s.trim())e=await $(s,r,t);else switch(l){case"latest":e=await m(r,t,"created","desc");break;case"a-z":e=await m(r,t,"title","asc");break;case"end-soon":e=await m(r,t,"endsAt","asc");break;default:e=await m(r,t)}let i=e.listings||[];console.log("fetched listings",i),w=e.meta||[],v=i.length<r;const p=new Date;l==="popular"&&(i.sort((o,u)=>u.bids.length-o.bids.length),console.log("After Sorting:",i.map(o=>({id:o.id,title:o.title,bidsCount:o.bids.length})))),c=[...c,...i],await b(c)}catch(e){console.error("Error displaying listings:",e),await b([])}}async function b(t){const s=document.querySelector(".listings-container"),l=document.getElementById("listings-count");if(s.innerHTML="",t.length===0){s.innerHTML="<p>No listings found.</p>",l.innerHTML="0 of 0 listings";return}l.innerHTML=`
        <span>${t.length} of ${w.totalCount}</span>
        `;for(const n of t){const e=n.title.length>12?`${n.title.substring(0,12)}...`:n.title,i=new Date,p=new Date(n.endsAt),o=i>p,u=p-i,h=Math.floor(u/(100*60*60*24)),x=Math.floor(u%(100*60*60*24)/(1e3*60*60)),y=h>0?` ${h} days & ${x} hours`:` ${x} hours`,d=document.createElement("li");d.classList.add("li-single-listing"),d.setAttribute("data-id",n.id),d.innerHTML=`
            <div class="li-single-listing-content flex flex-col relative rounded-xl border-collapse">
            <div>
            ${o?`<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full">ENDED</div>
         `:`
            <div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full">ACTIVE</div>
            `}
</div>
            <div id="soon-notif" class="hidden font-text text-xs text-notif-yellow absolute m-3 top-0 right-0 px-2 py-1 border border-notif-yellow bg-notif-bg-yellow z-1 rounded-full">END SOON</div>
            <div id="ended-notif" class="hidden font-text text-xs text-notif-red absolute m-3 top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full">ENDED</div>
                <img src="${n.media?.[0]?.url||"public/assets/images/missing-img.jpeg"}" alt="${n.media?.[0]?.alt||"No image"}">
                <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                    <span class="font-subtitle text-ui-black text-lg">${e}</span>
                    ${o?' <span class="uppercase text-notif-red font-text text-xs">Ended</span>':`
                <div class="flex flex-col font-text text-xs gap-1 font-light">
                    <span>Ends in:</span>
                    <span> ${y}</span>
                </div>
            </div>
            `}

            </div>
        `,s.appendChild(d),d.addEventListener("click",()=>{localStorage.setItem("listingId",n.id),window.location.href="../../../../single-listing/index.html"})}}document.getElementById("searchInput").addEventListener("input",async t=>{g=t.target.value.trim(),a=1,await f(a,g)});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});f(1);
