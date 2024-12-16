import"./input-CVPd-dJt.js";import{b as o,c as d}from"./main-CeTmBv1G.js";import{h as c,t as r,f as g}from"./listings-B-nIuWtN.js";/* empty css               */async function x(){const i=document.querySelector(".bids-container"),n=localStorage.getItem("loggedInUsername"),l=await o(n);i.innerHTML="";for(const t of l){const e=c(t.listing.endsAt),a=r(t.listing.endsAt),s=document.createElement("li");s.classList.add("li-single-listing"),s.setAttribute("data-id",t.id),console.log(t),s.innerHTML=`
            <div class="li-single-listing-content flex flex-col relative rounded-xl">
                <div>
                    ${e?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
                        <img class="listing-img" src="${t.listing.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.listing.media?.[0]?.alt||"No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.listing.title}</span>
                        ${e?' <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Amount of bids:</span>
                            <span>${t.amount}</span>
                        </div>
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Ends in:</span>
                            <span> ${a}</span>
                        </div>
                </div>
                `}
            </div>
        `,i.appendChild(s),s.addEventListener("click",()=>{localStorage.setItem("listingId",t.listing.id),window.location.href="../../single-listing/"})}}async function f(){const i=document.querySelector(".wins-container"),n=localStorage.getItem("loggedInUsername"),l=await d(n);i.innerHTML="";for(const t of l){const e=document.createElement("li");e.classList.add("li-single-listing"),e.setAttribute("data-id",t.id);const a=await g(t.endsAt);e.innerHTML=`
            <div class="flex flex-col relative rounded-xl">
                
                <img class="listing-img" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                    <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                    <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                    <span class="font-medium">Amount of bids</span>
                       <span>${t._count.bids}</span>
                </div>
                    <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                        <span class="font-medium">Ended:</span>
                       <span>${a}</span>
                    </div>
                </div>
            </div>
        `,i.appendChild(e),e.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../single-listing/"})}}f();x();
