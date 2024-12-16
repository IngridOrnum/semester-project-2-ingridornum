import{c as E,A as b}from"./input-GgqWnbqK.js";import{g as S,r as A}from"./main-DGWhb2vD.js";import{a as T}from"./read-Csp0O7Px.js";import{g as L,h as H,t as P,f as j}from"./listings-B-nIuWtN.js";async function C(s,e){const l=await S();if(!l)throw console.error("No access token found."),new Error("Unauthorized: No access token.");const d=new Headers({"X-Noroff-API-Key":E,Authorization:`Bearer ${l}`,"Content-Type":"application/json"}),r={method:"POST",headers:d,body:JSON.stringify({amount:e})};console.log("Sending API request to:",`${b}/${s}/bids`),console.log("Headers:",d),console.log("Body:",r.body);const a=await fetch(`${b}/${s}/bids`,r);if(!a.ok){const g=await a.text();throw console.error("Failed to place bid:",a.status,a.statusText,g),new Error(`Error placing bid: ${a.status}`)}const c=await a.json();return console.log("Bid API response:",c),c}document.querySelectorAll(".dropdown-btn").forEach(s=>{s.addEventListener("click",()=>{const e=s.nextElementSibling;e.style.display=e.style.display==="flex"?"none":"flex"})});async function N(){const s=localStorage.getItem("loggedInUsername");if(!s)throw new Error("No logged-in user found");return(await A(s)).data.credits}async function U(){const s=localStorage.getItem("listingId");if(!s){console.error("no listing id found");return}try{let B=function(i){const o=document.getElementById("carousel");let n="";i.length>0?(n=i.map((t,p)=>`
                    <img class="carousel-image" src="${t.url}" alt="${t.alt||"Image"}" style="display: ${p===0?"block":"none"}">
                `).join(""),o.innerHTML=n,i.length>1&&($(),k())):o.innerHTML='<img class="carousel-image" src="../../../../public/assets/images/missing-img.jpg" alt="No image available" style="display: block;">'},$=function(){document.getElementById("carousel").insertAdjacentHTML("beforeend",`
            <button class="prev carousel-buttons flex justify-center items-center">
                <img src="../../../../public/assets/icons/single-listing/left-arrow.svg" alt="left arrow icon">
            </button>
            <button class="next carousel-buttons flex justify-center items-center">
                <img src="../../../../public/assets/icons/single-listing/right-arrow.svg" alt="right arrow icon">
            </button>
            `)},k=function(){const i=document.querySelectorAll(".carousel-image"),o=document.querySelector(".prev"),n=document.querySelector(".next");let t=0;o.addEventListener("click",()=>{i[t].style.display="none",t=(t-1+i.length)%i.length,i[t].style.display="block"}),n.addEventListener("click",()=>{i[t].style.display="none",t=(t+1)%i.length,i[t].style.display="block"})};const e=await T(s),l=await L(e.data.bids),d=await N(),r=localStorage.getItem("loggedInUsername"),a=r===e.data.seller.name,c=e.data.bids.length>0?e.data.bids[e.data.bids.length-1].bidder:null,g=r===c,x=document.getElementById("single-listing-container"),u=H(e.data.endsAt),h=P(e.data.endsAt);x.innerHTML=`
    <h1 class="font-heading text-2xl mb-6 tablet:text-3xl">${e.data.title}</h1>
    <div class="flex mb-6">
        <div class="flex border border-[#C6CAC7] rounded">
            <div class="flex flex-col p-3 items-center w-[160px] gap-2">
                <span class="font-text text-ui-black tracking-wider font-medium text-xs uppercase">Highest Bid</span>
                <span class="font-heading text-ui-black text-2xl">${l} credits</span>
            </div>
            <div class="w-[1px] h-full bg-[#C6CAC7]"></div>
            <div class="flex flex-col p-2 items-center w-[160px] gap-2">
                <span class="font-text text-ui-black tracking-wider font-medium text-xs uppercase">${u?"Ended":"Ends in"}:</span>
                <span id="countdown" class="font-heading text-ui-black text-2xl">${u?"Auction has ended":h}</span>
            </div>
        </div>
    </div>
    <div>
        <div class="flex mb-6 w-[360px] justify-center">
        ${u?'<div class="border border-notif-red text-notif-red p-2.5 font-text">This auction has ended.</div>':a?'<div class="border border-ui-gray text-ui-gray p-2.5 font-text">You cannot bid on your own listing.</div>':`
                    <input id="bid-amount" class="h-[50px] outline-none border border-ui-gray rounded-l-sm font-text text-ui-black px-6" type="text" min="${l+1}" placeholder="Enter bid amount">
                    <button id="place-bid-button" class="h-[50px] border border-ui-black bg-ui-black text-ui-white font-text rounded-r-sm p-2.5">Place Bid</button>
                    `}
          </div>
        </div>
    </div>
    `;const y=document.getElementById("listing-description");y.innerHTML+=`
        <div>${e.data.description}</div>
        `;const v=document.getElementById("listing-tags");v.innerHTML+=`
        <div>${e.data.tags.join(", ")}</div>
        `;const m=document.getElementById("listing-bid-history");async function w(){if(e.data.bids.length>0){const i=e.data.bids.sort((n,t)=>new Date(n.created)-new Date(t.created)),o=await Promise.all(i.map(async(n,t)=>{const p=await j(n.created),f=t===i.length-1?"font-medium":"";return`
            <div class="h-[1px] w-full bg-primary-green"></div>
            <li class="p-2 flex gap-4 align-middle items-center">
                <div class="font-text text-[16px] w-6 h-6 text-ui-white bg-primary-green flex justify-center items-center rounded">
                    <span>${t+1}</span>
                </div>
                <span class="font-text text-[14px] ${f}">${n.amount} credits</span>
                <span class="font-text text-[14px] ${f}">${p}</span>
            </li>
            `}));m.innerHTML=o.join("")}else m.innerHTML="<li>No bids have been placed yet.</li>"}w();const I=document.getElementById("listing-about-seller");I.innerHTML+=`
        <div class="flex items-center gap-4">
            <img class="rounded-full w-10 h-10 object-cover" src="${e.data.seller.avatar.url||"public/assets/images/missing-img.jpg"}" alt="${e.data.seller.avatar.alt||"User Avatar"}">
            <span class="font-heading text-2xl">${e.data.seller.name}</span>
        </div>
        <div class="flex flex-col items-center gap-6">
            <div>${e.data.seller.bio||"No bio available."}</div>
            <button class="visit-profile px-14 h-[44px] bg-ui-white text-ui-black rounded-sm hover:bg-ui-black hover:text-ui-white">Visit Profile</button>
        </div>
        `,document.querySelector(".visit-profile").addEventListener("click",()=>{localStorage.setItem("profileUsername",e.data.seller.name),window.location.href="../../../../profile/"}),B(e.data.media),!u&&!a&&!g&&document.getElementById("place-bid-button").addEventListener("click",async()=>{const o=document.getElementById("bid-amount"),n=parseFloat(o.value);if(isNaN(n)||n<=0){alert("Please enter a valid bid amount.");return}if(n<=l){alert(`Your bid must be higher than the current highest bid of ${l} credits.`);return}if(n>d){alert("You have not enough credits to place this bid.");return}try{const t=await C(s,n);alert("Bid placed successfully!"),location.reload()}catch(t){console.error(t),alert("Failed to place bid. Please try again.")}})}catch(e){console.error("Error displaying single listing:",e)}}function D(){localStorage.accessToken||(alert("Please login to view and bid on listings"),window.location.href="/auth/login/")}U();D();
