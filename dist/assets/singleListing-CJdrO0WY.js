import{c as $,A as b}from"./constants-BDf8nfUD.js";import{g as x,r as S}from"./main-B4YcYq6j.js";import{a as L}from"./read-bf7At211.js";import{g as A,h as T,t as H}from"./listings-Ubj3QYyM.js";async function P(s,e){const l=await x();if(!l)throw console.error("No access token found."),new Error("Unauthorized: No access token.");const d=new Headers({"X-Noroff-API-Key":$,Authorization:`Bearer ${l}`,"Content-Type":"application/json"}),r={method:"POST",headers:d,body:JSON.stringify({amount:e})};console.log("Sending API request to:",`${b}/${s}/bids`),console.log("Headers:",d),console.log("Body:",r.body);const o=await fetch(`${b}/${s}/bids`,r);if(!o.ok){const u=await o.text();throw console.error("Failed to place bid:",o.status,o.statusText,u),new Error(`Error placing bid: ${o.status}`)}const c=await o.json();return console.log("Bid API response:",c),c}document.querySelectorAll(".dropdown-btn").forEach(s=>{s.addEventListener("click",()=>{const e=s.nextElementSibling;e.style.display=e.style.display==="flex"?"none":"flex"})});async function k(){const s=localStorage.getItem("loggedInUsername");if(!s)throw new Error("No logged-in user found");return(await S(s)).data.credits}async function N(){const s=localStorage.getItem("listingId");if(!s){console.error("no listing id found");return}try{let I=function(t){const a=document.getElementById("carousel");let i="";t.length>0?(i=t.map((n,w)=>`
                    <img class="carousel-image" src="${n.url}" alt="${n.alt||"Image"}" style="display: ${w===0?"block":"none"}">
                `).join(""),a.innerHTML=i,t.length>1&&(B(),E())):a.innerHTML='<img class="carousel-image" src="../../../../public/assets/images/missing-img.jpg" alt="No image available" style="display: block;">'},B=function(){document.getElementById("carousel").insertAdjacentHTML("beforeend",`
            <button class="prev carousel-buttons">Prev</button>
            <button class="next carousel-buttons">Next</button>
            `)},E=function(){const t=document.querySelectorAll(".carousel-image"),a=document.querySelector(".prev"),i=document.querySelector(".next");let n=0;a.addEventListener("click",()=>{t[n].style.display="none",n=(n-1+t.length)%t.length,t[n].style.display="block"}),i.addEventListener("click",()=>{t[n].style.display="none",n=(n+1)%t.length,t[n].style.display="block"})};const e=await L(s),l=await A(e.data.bids),d=await k(),r=localStorage.getItem("loggedInUsername"),o=r===e.data.seller.name,c=e.data.bids.length>0?e.data.bids[e.data.bids.length-1].bidder:null,u=r===c,m=document.getElementById("single-listing-container"),g=T(e.data.endsAt),f=H(e.data.endsAt);m.innerHTML=`
    <h1>${e.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${l} credits</span>
        </div>
       <div class="flex flex-col border border-slate-900 p-2">
                    <span>${g?"Ended":"Ends in"}:</span>
                    <span id="countdown">${g?"Auction has ended":f}</span>
                </div>
            </div>
   
    </div>
    <div>
        <div class="flex">
        ${g?'<div class="border border-red-600 text-red-600 p-2.5">This auction has ended.</div>':o?'<div class="border border-yellow-600 text-yellow-600 p-2.5">You cannot bid on your own listing.</div>':u?'<div class="border border-blue-600 text-blue-600 p-2.5">You are already the highest bidder.</div>':`
                    <input id="bid-amount" class="border border-slate-900" type="text" min="${l+1}" placeholder="Enter bid amount">
                    <button id="place-bid-button" class="border border-slate-900 p-2.5">Place Bid</button>
                    `}
          </div>
        </div>
    </div>
    `;const y=document.getElementById("listing-description");y.innerHTML+=`
        <div>${e.data.description}</div>
        `;const h=document.getElementById("listing-tags");h.innerHTML+=`
        <div>${e.data.tags}</div>
        `;const p=document.getElementById("listing-bid-history");e.data.bids.length>0?p.innerHTML=e.data.bids.map((t,a)=>`
                <li>
                    <span>${a+1}</span>
                    <span>${t.amount} credits</span>
                    <span>${t.created}</span>
                </li>
            `).join(""):p.innerHTML="<li>No bids have been placed yet.</li>";const v=document.getElementById("listing-about-seller");v.innerHTML+=`
        <div class="flex items-center">
            <img class="rounded-full w-10 h-10" src="${e.data.seller.avatar.url||"public/assets/images/missing-img.jpg"}" alt="${e.data.seller.avatar.alt||"User Avatar"}">
            <span>${e.data.seller.name}</span>
        </div>
        <div>${e.data.seller.bio||"No bio available."}</div>
       
            <button class="visit-profile">Visit Profile</button>
       
        `,document.querySelector(".visit-profile").addEventListener("click",()=>{localStorage.setItem("profileUsername",e.data.seller.name),window.location.href="../../../../profile/"}),I(e.data.media),!g&&!o&&!u&&document.getElementById("place-bid-button").addEventListener("click",async()=>{const a=document.getElementById("bid-amount"),i=parseFloat(a.value);if(isNaN(i)||i<=0){alert("Please enter a valid bid amount.");return}if(i<=l){alert(`Your bid must be higher than the current highest bid of ${l} credits.`);return}if(i>d){alert("You have not enough credits to place this bid.");return}console.log("Placing bid:",{listingId:s,bidAmount:i});try{const n=await P(s,i);alert("Bid placed successfully!"),console.log("bid response",n),location.reload()}catch(n){console.error(n),alert("Failed to place bid. Please try again.")}})}catch(e){console.error("Error displaying single listing:",e)}}N();
