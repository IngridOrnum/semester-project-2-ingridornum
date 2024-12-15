import{c as T,A as h}from"./constants-BDf8nfUD.js";import{g as L,r as S}from"./main-B4YcYq6j.js";import{a as A}from"./read-C4asiSSn.js";import{g as P}from"./listings-Ubj3QYyM.js";async function H(i,e){const l=await L(),r={method:"POST",headers:{"X-Noroff-API-Key":T,Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({amount:e})};console.log("Sending API request to:",`${h}/${i}/bids`,r);const a=await fetch(`${h}/${i}/bids`,r);if(!a.ok){const d=await a.text();throw console.error("Failed to place bid:",a.status,a.statusText,d),new Error(`Error placing bid: ${a.status}`)}return await a.json()}document.querySelectorAll(".dropdown-btn").forEach(i=>{i.addEventListener("click",()=>{const e=i.nextElementSibling;e.style.display=e.style.display==="flex"?"none":"flex"})});async function k(){const i=localStorage.getItem("loggedInUsername");if(!i)throw new Error("No logged-in user found");return(await S(i)).data.credits}async function M(){const i=localStorage.getItem("listingId");if(!i){console.error("no listing id found");return}try{let I=function(t){const o=document.getElementById("carousel");let s="";t.length>0?(s=t.map((n,x)=>`
                    <img class="carousel-image" src="${n.url}" alt="${n.alt||"Image"}" style="display: ${x===0?"block":"none"}">
                `).join(""),o.innerHTML=s,t.length>1&&(B(),w())):o.innerHTML='<img class="carousel-image" src="../../../../public/assets/images/missing-img.jpg" alt="No image available" style="display: block;">'},B=function(){document.getElementById("carousel").insertAdjacentHTML("beforeend",`
            <button class="prev carousel-buttons">Prev</button>
            <button class="next carousel-buttons">Next</button>
            `)},w=function(){const t=document.querySelectorAll(".carousel-image"),o=document.querySelector(".prev"),s=document.querySelector(".next");let n=0;o.addEventListener("click",()=>{t[n].style.display="none",n=(n-1+t.length)%t.length,t[n].style.display="block"}),s.addEventListener("click",()=>{t[n].style.display="none",n=(n+1)%t.length,t[n].style.display="block"})};const e=await A(i),l=await P(e.data.bids),r=await k(),a=document.getElementById("single-listing-container"),g=new Date,d=new Date(e.data.endsAt),c=g>d,m=d-g,b=Math.floor(m/(1e3*60*60*24)),p=Math.floor(m%(1e3*60*60*24)/(1e3*60*60)),f=Math.floor(m%(1e3*60*60)/(1e3*60));let u="";b>0?u=`${b} days, ${p} hours`:p>0?u=`${p} hours, ${f} minutes`:u=`${f} minutes`,a.innerHTML=`
    <h1>${e.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${l} credits</span>
        </div>
       <div class="flex flex-col border border-slate-900 p-2">
                    <span>${c?"Ended":"Ends in"}:</span>
                    <span id="countdown">${c?"Auction has ended":u}</span>
                </div>
            </div>
   
    </div>
    <div>
        <div class="flex">
        ${c?'<div class="border border-red-600 text-red-600 p-2.5">This auction has ended.</div>':`
            <input id="bid-amount" class="border border-slate-900" type="text" min="${l+1}" placeholder="Enter bid amount">
            <button id="place-bid-button" class="border border-slate-900 p-2.5">Place Bid</button>
            `}
          </div>
        </div>
    </div>
    `;const v=document.getElementById("listing-description");v.innerHTML+=`
        <div>${e.data.description}</div>
        `;const $=document.getElementById("listing-tags");$.innerHTML+=`
        <div>${e.data.tags}</div>
        `;const y=document.getElementById("listing-bid-history");e.data.bids.length>0?y.innerHTML=e.data.bids.map((t,o)=>`
                <li>
                    <span>${o+1}</span>
                    <span>${t.amount} credits</span>
                    <span>${t.created}</span>
                </li>
            `).join(""):y.innerHTML="<li>No bids have been placed yet.</li>";const E=document.getElementById("listing-about-seller");E.innerHTML+=`
        <div class="flex items-center">
            <img class="rounded-full w-10 h-10" src="${e.data.seller.avatar.url||"public/assets/images/missing-img.jpg"}" alt="${e.data.seller.avatar.alt||"User Avatar"}">
            <span>${e.data.seller.name}</span>
        </div>
        <div>${e.data.seller.bio||"No bio available."}</div>
       
            <button class="visit-profile">Visit Profile</button>
       
        `,document.querySelector(".visit-profile").addEventListener("click",()=>{localStorage.setItem("profileUsername",e.data.seller.name),window.location.href="../../../../profile/"}),I(e.data.media),c||document.getElementById("place-bid-button").addEventListener("click",async()=>{const o=document.getElementById("bid-amount"),s=parseFloat(o.value);if(isNaN(s)||s<=0){alert("Pleace enter a valid bid amount.");return}if(s<=l){alert("Your bid must be higher than the current highest bid of ${highestBid} credits.");return}if(s>r){alert("You have not enough credits to place this bid.");return}console.log("Placing bid:",{listingId:i,bidAmount:s});try{const n=await H(i,s);alert("Bid placed successfully!"),console.log("bid response",n),location.reload()}catch(n){console.error(n),alert("Failed to place bid. Please try again.")}})}catch(e){console.error("Error displaying single listing:",e)}}M();
