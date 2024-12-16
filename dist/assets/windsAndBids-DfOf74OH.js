import"./input-CPdIg46K.js";import{b as d,c as r}from"./main-CYj49QAp.js";import{h as c,t as f,f as g}from"./listings-B-nIuWtN.js";/* empty css               */async function x(){const i=document.querySelector(".bids-container"),l=localStorage.getItem("loggedInUsername"),a=await d(l),e=new Map;i.innerHTML="";for(const t of a){if(e.has(t.listing.id))continue;e.set(t.listing.id,!0);const n=c(t.listing.endsAt),o=f(t.listing.endsAt),s=document.createElement("li");s.classList.add("li-single-listing"),s.setAttribute("data-id",t.id),s.innerHTML=`
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div>
                    ${n?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3  mt-4 top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-4 top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
                <img class="object-cover w-full h-[200px] tablet:h-[220px] justify-center" src="${t.listing.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.listing.media?.[0]?.alt||"No image"}">
                <div class="flex flex-col gap-2 p-2 tablet:gap-4 tablet:p-4">
                    <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.listing.title}</span>
                    ${n?' <span class="uppercase border-2 flex justify-center rounded-md border-notif-red p-3 text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Amount of bids:</span>
                            <span>${t.amount}</span>
                        </div>
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Ends in:</span>
                            <span> ${o}</span>
                        </div>
                </div>
                `}
            </div>
        `,i.appendChild(s),s.addEventListener("click",()=>{localStorage.setItem("listingId",t.listing.id),window.location.href="../../single-listing/"})}}async function p(){const i=document.querySelector(".wins-container"),l=localStorage.getItem("loggedInUsername"),a=await r(l);i.innerHTML="";for(const e of a){const t=document.createElement("li");t.classList.add("li-single-listing"),t.setAttribute("data-id",e.id);const n=await g(e.endsAt);t.innerHTML=`
            <div class="flex flex-col relative rounded-xl">
                
                <img class="object-cover w-full h-[200px] tablet:h-[220px] justify-center" src="${e.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${e.media?.[0]?.alt||"No image"}">
                <div class="flex flex-col gap-2 p-2 tablet:gap-4 tablet:p-4 min-h-[112px]">
                    <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${e.title}</span>
                    <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                    <span class="font-medium">Amount of bids</span>
                       <span>${e._count.bids}</span>
                </div>
                    <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                        <span class="font-medium">Ended:</span>
                       <span>${n}</span>
                    </div>
                </div>
            </div>
        `,i.appendChild(t),t.addEventListener("click",()=>{localStorage.setItem("listingId",e.id),window.location.href="../../single-listing/"})}}p();x();
