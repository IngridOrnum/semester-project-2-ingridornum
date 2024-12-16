import"./constants-BDf8nfUD.js";import{r as f,a as b}from"./main-B4YcYq6j.js";import{h as m,t as u,g as v}from"./listings-Ubj3QYyM.js";/* empty css              *//* empty css               */async function h(){const c=localStorage.getItem("loggedInUsername"),r=localStorage.getItem("profileUsername"),n=r||c;if(!n){console.error("no username found in localstorage");return}try{const e=await f(n),o=document.getElementById("user-profile-info");if(o){o.innerHTML=`
    <div class="flex flex-col items-center gap-4">
        <img class="w-screen h-[200px] object-cover relative tablet:h-[380px]" src="${e.data.banner.url}" alt="Profile Banner">
        <img class="w-24 h-24 rounded-full object-cover absolute z-1 top-[220px] tablet:w-48 tablet:h-48 tablet:top-[352px]" src="${e.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-black text-xl mt-8 tablet:text-3xl tablet:mt-24">${e.data.name}</span>
        <div class="font-text text-base font-light text-[#727272] px-5 mt-5 tablet:text-lg">${e.data.bio}</div>
    </div>
                `;const l=await b(n),a=document.querySelector(".listingsGrid"),s=document.querySelector(".listings-counter");if(a.innerHTML="",l.length===0){a.innerHTML='<p class="text-ui-black font-subtitle text-4xl">No listings found.</p>',s&&(s.innerHTML="0 listings");return}const x=l.length;s&&(s.innerHTML=`
                    <span class="text-ui-black font-text text-sm">${x} listings</span>
                `);for(const t of l){const d=m(t.endsAt),p=u(t.endsAt),g=await v(t.bids),i=document.createElement("div");i.className="li-single-listing flex flex-col relative rounded-xl cursor-pointer",i.innerHTML=`
                <div class="li-single-listing-content flex flex-col relative h-[302px] tablet:h-[424px]">
                    <div>
                        ${d?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-4 top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full tablet:text-base">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-4 top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full tablet:text-base">ACTIVE</div>'}
                    </div>
                    <img class="listing-img" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                    <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="flex justify-center font-subtitle text-ui-black text-lg tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                        ${d?' <span class="uppercase border flex justify-center rounded-md border-notif-red p-3 text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex gap-5 justify-center items-center">
                            <div class="flex flex-col w-[110px] tablet:w-[136px] tablet:p-[8px] items-center  py-3 border-2 border-transparent bg-primary-green text-ui-white rounded-md font-text text-xs gap-1 font-light tablet:text-base">
                                <span class="text[8px] tablet:text-sm uppercase">Highest bid:</span>
                                <span class="text-[14px] tablet:text-lg">${g} credits</span>
                            </div>
                            <div class="flex flex-col w-[110px] tablet:w-[136px] tablet:p-[8px] items-center py-3 border-2 border-primary-green text-ui-black rounded-md font-text text-xs gap-1 font-light tablet:text-base">
                                <span class="text[8px] tablet:text-sm font-medium uppercase">Ends in:</span>
                                <span class="text-[14px] tablet:text-lg"> ${p}</span>
                            </div>
                        </div>
                    </div>
                    `}
               </div>
                `,a.appendChild(i),i.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/"})}}}catch(e){console.error("Error displaying user profile info:",e)}}h();
