import"./constants-BDf8nfUD.js";import{r as x,a as p}from"./main-btKrpKiE.js";import{h as g,t as m}from"./input-83gozqu3.js";async function b(){const a=localStorage.getItem("loggedInUsername"),r=localStorage.getItem("profileUsername"),n=a||r;if(!n){console.error("no username found in localstorage");return}try{const t=await x(a),i=document.getElementById("user-profile-info");if(i){i.innerHTML=`
    <div class="flex flex-col items-center gap-4">
        <img class="w-screen h-[200px] object-cover relative" src="${t.data.banner.url}" alt="Profile Banner">
        <img class="w-24 h-24 rounded-full object-cover absolute z-1 top-[220px]" src="${t.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-black text-xl mt-8 tablet:text-3xl">${t.data.name}</span>
        <div class="font-text font-light text-[#727272]">${t.data.bio}</div>
    </div>
                `;const d=await p(n),o=document.querySelector(".listingsGrid");o.innerHTML="",d.forEach(e=>{const l=g(e.endsAt),c=m(e.endsAt),f=e.highestBid||"No bids",s=document.createElement("div");s.className="li-single-listing-content flex flex-col relative rounded-xl cursor-pointer",s.innerHTML=`
                 
                <div>
                    ${l?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
                        <img class="listing-img" src="${e.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${e.media?.[0]?.alt||"No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${e.title}</span>
                        ${l?' <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Highest bid:</span>
                            <span>${f} credits</span>
                        </div>
                        <div class="flex flex-col font-text text-xs gap-1 font-light tablet:text-base tablet:flex-row">
                            <span class="font-medium">Ends in:</span>
                            <span> ${c}</span>
                        </div>
                </div>
                `}
            
                `,o.appendChild(s),s.addEventListener("click",()=>{localStorage.setItem("listingId",e.id),window.location.href="../../../../single-listing/"})})}}catch(t){console.error("Error displaying user profile info:",t)}}b();
