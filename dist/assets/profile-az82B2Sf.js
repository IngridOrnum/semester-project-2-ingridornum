import"./constants-BDf8nfUD.js";import{r as g,a as x}from"./main-8ZS2Xavq.js";import{h as p,t as m,g as b}from"./listings-UwpdXMdd.js";/* empty css              *//* empty css               */async function u(){const s=localStorage.getItem("loggedInUsername"),r=localStorage.getItem("profileUsername"),n=s||r;if(!n){console.error("no username found in localstorage");return}try{const e=await g(s),a=document.getElementById("user-profile-info");if(a){a.innerHTML=`
    <div class="flex flex-col items-center gap-4">
        <img class="w-screen h-[200px] object-cover relative" src="${e.data.banner.url}" alt="Profile Banner">
        <img class="w-24 h-24 rounded-full object-cover absolute z-1 top-[220px]" src="${e.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-black text-xl mt-8 tablet:text-3xl">${e.data.name}</span>
        <div class="font-text font-light text-[#727272]">${e.data.bio}</div>
    </div>
                `;const d=await x(n),l=document.querySelector(".listingsGrid");l.innerHTML="";for(const t of d){const o=p(t.endsAt),c=m(t.endsAt),f=await b(t.bids),i=document.createElement("div");i.className="li-single-listing-content flex flex-col relative rounded-xl cursor-pointer",i.innerHTML=`
                 
                <div>
                    ${o?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-[68px] top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                </div>
                        <img class="listing-img" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                        <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                        ${o?' <span class="uppercase text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
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
            
                `,l.appendChild(i),i.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/"})}}}catch(e){console.error("Error displaying user profile info:",e)}}u();
