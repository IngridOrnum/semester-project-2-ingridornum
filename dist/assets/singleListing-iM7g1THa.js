import{c as k,A as $}from"./input-3MpwG_SX.js";import{g as S,r as L}from"./main-BVhcVta1.js";import{a as T}from"./read-CNH1NDIt.js";import{g as A,h as H,t as j,f as C}from"./listings-B-nIuWtN.js";async function N(s,e){const r=await S();if(!r)throw console.error("No access token found."),new Error("Unauthorized: No access token.");const l={method:"POST",headers:new Headers({"X-Noroff-API-Key":k,Authorization:`Bearer ${r}`,"Content-Type":"application/json"}),body:JSON.stringify({amount:e})},a=await fetch(`${$}/${s}/bids`,l);if(!a.ok){const c=await a.text();throw console.error("Failed to place bid:",a.status,a.statusText,c),new Error(`Error placing bid: ${a.status}`)}return await a.json()}document.querySelectorAll(".dropdown-btn").forEach(s=>{s.addEventListener("click",()=>{const e=s.nextElementSibling;e.style.display=e.style.display==="flex"?"none":"flex"})});async function P(){const s=localStorage.getItem("loggedInUsername");if(!s)throw new Error("No logged-in user found");return(await L(s)).data.credits}async function U(){const s=localStorage.getItem("listingId");if(!s){console.error("no listing id found");return}try{let I=function(n){const o=document.getElementById("carousel");let i="";n.length>0?(i=n.map((t,u)=>`
                    <img class="carousel-image" src="${t.url}" alt="${t.alt||"Image"}" style="display: ${u===0?"block":"none"}">
                `).join(""),o.innerHTML=i,n.length>1&&(B(),E())):o.innerHTML='<img class="carousel-image" src="../../../../public/assets/images/missing-img.jpg" alt="No image available" style="display: block;">'},B=function(){document.getElementById("carousel").insertAdjacentHTML("beforeend",`
            <button class="prev carousel-buttons flex justify-center items-center">
               <span class="rotate-180">►</span> 
            </button>
            <button class="next carousel-buttons flex justify-center items-center">
                <span>►</span>
            </button>
            `)},E=function(){const n=document.querySelectorAll(".carousel-image"),o=document.querySelector(".prev"),i=document.querySelector(".next");let t=0;o.addEventListener("click",()=>{n[t].style.display="none",t=(t-1+n.length)%n.length,n[t].style.display="block"}),i.addEventListener("click",()=>{n[t].style.display="none",t=(t+1)%n.length,n[t].style.display="block"})};const e=await T(s),r=await A(e.data.bids),g=await P(),l=localStorage.getItem("loggedInUsername"),a=l===e.data.seller.name,p=e.data.bids.length>0?e.data.bids[e.data.bids.length-1].bidder:null,c=l===p,b=document.getElementById("single-listing-container"),d=H(e.data.endsAt),x=j(e.data.endsAt);b.innerHTML=`
    <h1 class="font-heading text-2xl mb-6 tablet:text-3xl">${e.data.title}</h1>
    <div class="flex mb-6">
        <div class="flex border border-[#C6CAC7] rounded">
            <div class="flex flex-col p-3 items-center w-[160px] gap-2">
                <span class="font-text text-ui-black tracking-wider font-medium text-xs uppercase">Highest Bid</span>
                <span class="font-heading text-ui-black text-2xl">${r} credits</span>
            </div>
            <div class="w-[1px] h-full bg-[#C6CAC7]"></div>
            <div class="flex flex-col p-2 items-center w-[160px] gap-2">
                <span class="font-text text-ui-black tracking-wider font-medium text-xs uppercase">${d?"Ended":"Ends in"}:</span>
                <span id="countdown" class="font-heading text-ui-black text-2xl">${d?"Auction has ended":x}</span>
            </div>
        </div>
    </div>
    <div>
        <div class="flex mb-6 w-[360px] justify-center">
        ${d?'<div class="border border-notif-red text-notif-red p-2.5 font-text">This auction has ended.</div>':a?'<div class="border border-ui-gray text-ui-gray p-2.5 font-text">You cannot bid on your own listing.</div>':`
                    <input id="bid-amount" class="h-[50px] outline-none border border-ui-gray rounded-l-sm font-text text-ui-black px-6" type="text" min="${r+1}" placeholder="Enter bid amount">
                    <button id="place-bid-button" class="h-[50px] border border-ui-black bg-ui-black text-ui-white font-text rounded-r-sm p-2.5">Place Bid</button>
                    `}
          </div>
        </div>
    </div>
    `;const h=document.getElementById("listing-description");h.innerHTML+=`
        <div>${e.data.description}</div>
        `;const y=document.getElementById("listing-tags");y.innerHTML+=`
        <div>${e.data.tags.join(", ")}</div>
        `;const m=document.getElementById("listing-bid-history");async function v(){if(e.data.bids.length>0){const n=e.data.bids.sort((i,t)=>new Date(i.created)-new Date(t.created)),o=await Promise.all(n.map(async(i,t)=>{const u=await C(i.created),f=t===n.length-1?"font-medium":"";return`
            <div class="h-[1px] w-full bg-primary-green"></div>
            <li class="p-2 flex gap-4 align-middle items-center">
                <div class="font-text text-[16px] w-6 h-6 text-ui-white bg-primary-green flex justify-center items-center rounded">
                    <span>${t+1}</span>
                </div>
                <span class="font-text text-[14px] ${f}">${i.amount} credits</span>
                <span class="font-text text-[14px] ${f}">${u}</span>
            </li>
            `}));m.innerHTML=o.join("")}else m.innerHTML="<li>No bids have been placed yet.</li>"}v();const w=document.getElementById("listing-about-seller");w.innerHTML+=`
        <div class="flex items-center gap-4">
            <img class="rounded-full w-10 h-10 object-cover" src="${e.data.seller.avatar.url||"public/assets/images/missing-img.jpg"}" alt="${e.data.seller.avatar.alt||"User Avatar"}">
            <span class="font-heading text-2xl">${e.data.seller.name}</span>
        </div>
        <div class="flex flex-col items-center gap-6">
            <div>${e.data.seller.bio||"No bio available."}</div>
            <button class="visit-profile px-14 h-[44px] bg-ui-white text-ui-black rounded-sm hover:bg-ui-black hover:text-ui-white">Visit Profile</button>
        </div>
        `,document.querySelector(".visit-profile").addEventListener("click",()=>{localStorage.setItem("profileUsername",e.data.seller.name),window.location.href="../../../../profile/"}),I(e.data.media),!d&&!a&&!c&&document.getElementById("place-bid-button").addEventListener("click",async()=>{const o=document.getElementById("bid-amount"),i=parseFloat(o.value);if(isNaN(i)||i<=0){alert("Please enter a valid bid amount.");return}if(i<=r){alert(`Your bid must be higher than the current highest bid of ${r} credits.`);return}if(i>g){alert("You have not enough credits to place this bid.");return}try{const t=await N(s,i);alert("Bid placed successfully!"),location.reload()}catch(t){console.error(t),alert("Failed to place bid. Please try again.")}})}catch(e){console.error("Error displaying single listing:",e)}}U();
