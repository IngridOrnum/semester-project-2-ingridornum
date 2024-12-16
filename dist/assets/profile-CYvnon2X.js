import{r as g,a as u}from"./main-CQCJvdNu.js";import{h as m,t as b,g as v}from"./listings-B-nIuWtN.js";async function y(){const c=localStorage.getItem("loggedInUsername"),r=localStorage.getItem("profileUsername"),n=r||c;if(!n){console.error("no username found in localstorage");return}try{const e=await g(n),o=document.getElementById("user-profile-info");if(o){o.innerHTML=`
    <div class="flex flex-col items-center gap-4">
        <img class="w-screen h-[200px] object-cover relative tablet:h-[380px]" src="${e.data.banner.url}" alt="Profile Banner">
        <img class="w-24 h-24 rounded-full object-cover absolute z-1 top-[220px] tablet:w-48 tablet:h-48 tablet:top-[352px]" src="${e.data.avatar.url}" alt="Profile Avatar">
        <span class="font-subtitle text-ui-black text-xl mt-8 tablet:text-3xl tablet:mt-24">${e.data.name}</span>
        <div class="font-text text-base font-light text-[#727272] px-5 mt-5 tablet:text-lg">${e.data.bio||"No bio available."}</div>
    </div>
                `;const l=await u(n),a=document.querySelector(".listingsGrid"),i=document.querySelector(".listings-counter");if(a.innerHTML="",l.length===0){a.innerHTML='<p class="text-ui-black font-subtitle text-4xl">No listings found.</p>',i&&(i.innerHTML="0 listings");return}const x=l.length;i&&(i.innerHTML=`
                    <span class="text-ui-black font-text text-sm">${x} listings</span>
                `);for(const t of l){const d=m(t.endsAt),p=b(t.endsAt),f=await v(t.bids),s=document.createElement("div");s.className="li-single-listing flex flex-col relative rounded-xl cursor-pointer",s.innerHTML=`
                <div class="li-single-listing-content flex flex-col relative h-[346px]">
                    <div>
                        ${d?'<div id="ended-notif" class="font-text text-xs text-notif-red absolute m-3 mt-4 top-0 right-0 px-2 py-1 border border-notif-red bg-notif-bg-red z-1 rounded-full">ENDED</div>':'<div id="active-notif" class=" font-text text-xs text-notif-green absolute m-3 mt-4 top-0 right-0 px-2 py-1 border border-notif-green bg-notif-bg-green z-1 rounded-full">ACTIVE</div>'}
                    </div>
                    <img class="object-cover w-full h-[200px] justify-center" src="${t.media?.[0]?.url||"public/assets/images/missing-img.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                    <div class="flex flex-col gap-4 p-4 min-h-[112px]">
                        <span class="flex font-subtitle text-ui-black text-xl tablet:text-2xl overflow-hidden whitespace-nowrap max-w-full">${t.title}</span>
                        ${d?' <span class="uppercase flex justify-center border-2 border-notif-red rounded p-3 text-notif-red font-text text-xs tablet:text-base">Ended</span>':`
                        <div class="flex gap-5 justify-center items-center mt-[8px]">
                            <div class="flex flex-col w-[110px] tablet:w-[136px] tablet:p-[8px] items-center  py-3 border-2 border-transparent bg-primary-green text-ui-white rounded-md font-text text-xs gap-1 font-light ">
                                <span class="text[8px]  uppercase">Highest bid:</span>
                                <span class="text-[14px] ">${f} credits</span>
                            </div>
                            <div class="flex flex-col w-[110px] tablet:w-[136px] tablet:p-[8px] items-center py-3 border-2 border-primary-green text-ui-black rounded-md font-text text-xs gap-1 font-light">
                                <span class="text[8px] font-medium uppercase">Ends in:</span>
                                <span class="text-[14px] "> ${p}</span>
                            </div>
                        </div>
                    </div>
                    `}
               </div>
                `,a.appendChild(s),s.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/"})}}}catch(e){console.error("Error displaying user profile info:",e)}}export{y as d};
