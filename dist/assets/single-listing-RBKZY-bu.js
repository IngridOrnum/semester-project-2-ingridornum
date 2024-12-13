import{A as p,c as v}from"./constants-BDf8nfUD.js";import{g as $,r as L}from"./main-Cx0DgoeT.js";async function j(t=40,e=1,l="latest",o="",a="all"){const i=new URLSearchParams({limit:t,page:e,_seller:!0,_bids:!0});l==="latest"?(i.append("sort","created"),i.append("sortOrder","desc")):l==="a-z"&&(i.append("sort","title"),i.append("sortOrder","asc")),a==="active"&&i.append("_active","true"),o&&i.append("q",o);const g={method:"GET"},d=await fetch(`${p}?${i.toString()}`,g);if(console.log(`${p}?${i.toString()}`),!d.ok)throw new Error(`Error fetching data: ${d.status} ${d.statusText}`);const u=await d.json();return console.log("API Response in listings:",u),{listings:u.data||[],meta:u.meta||{}}}async function S(t){const e=await $(),l={method:"GET",headers:{"X-Noroff-API-Key":v,Authorization:`Bearer ${e}`,"Content-Type":"application/json"}},o=await fetch(`${p}/${t}?_bids=true&_seller=true`,l);if(!o.ok)throw console.error("Failed to fetch profile data:",o),new Error(`Error fetching profile data: ${o.status}`);const a=await o.json();return console.log(a),a}async function P(t,e){const l=await $(),o={method:"POST",headers:{"X-Noroff-API-Key":v,Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({amount:e})};console.log("Sending API request to:",`${p}/${t}/bids`,o);const a=await fetch(`${p}/${t}/bids`,o);if(!a.ok){const g=await a.text();throw console.error("Failed to place bid:",a.status,a.statusText,g),new Error(`Error placing bid: ${a.status}`)}return await a.json()}document.querySelectorAll(".dropdown-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.nextElementSibling;e.style.display=e.style.display==="flex"?"none":"flex"})});async function k(){const t=localStorage.getItem("loggedInUsername");if(!t)throw new Error("No logged-in user found");return(await L(t)).data.credits}async function N(t){return!t||!t.length?(console.log("No bids found."),"No bids"):Math.max(...t.map(e=>e.amount))}async function C(){const t=localStorage.getItem("listingId");if(!t){console.error("no listing id found");return}try{let B=function(n){const c=document.getElementById("carousel");let r="";n.length>0?(r=n.map((s,A)=>`
                    <img class="carousel-image" src="${s.url}" alt="${s.alt||"Image"}" style="display: ${A===0?"block":"none"}">
                `).join(""),c.innerHTML=r,n.length>1&&(T(),x())):c.innerHTML='<img class="carousel-image" src="../../../../public/assets/images/missing-img.jpg" alt="No image available" style="display: block;">'},T=function(){document.getElementById("carousel").insertAdjacentHTML("beforeend",`
            <button class="prev carousel-buttons">Prev</button>
            <button class="next carousel-buttons">Next</button>
            `)},x=function(){const n=document.querySelectorAll(".carousel-image"),c=document.querySelector(".prev"),r=document.querySelector(".next");let s=0;c.addEventListener("click",()=>{n[s].style.display="none",s=(s-1+n.length)%n.length,n[s].style.display="block"}),r.addEventListener("click",()=>{n[s].style.display="none",s=(s+1)%n.length,n[s].style.display="block"})};const e=await S(t),l=await N(e.data.bids),o=await k(),a=document.getElementById("single-listing-container"),i=new Date,g=new Date(e.data.endsAt),d=i>g,u=g-i,b=Math.floor(u/(1e3*60*60*24)),f=Math.floor(u%(1e3*60*60*24)/(1e3*60*60)),h=Math.floor(u%(1e3*60*60)/(1e3*60));let m="";b>0?m=`${b} days, ${f} hours`:f>0?m=`${f} hours, ${h} minutes`:m=`${h} minutes`,a.innerHTML=`
    <h1>${e.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${l} credits</span>
        </div>
       <div class="flex flex-col border border-slate-900 p-2">
                    <span>${d?"Ended":"Ends in"}:</span>
                    <span id="countdown">${d?"Auction has ended":m}</span>
                </div>
            </div>
   
    </div>
    <div>
        <div class="flex">
        ${d?'<div class="border border-red-600 text-red-600 p-2.5">This auction has ended.</div>':`
            <input id="bid-amount" class="border border-slate-900" type="text" min="${l+1}" placeholder="Enter bid amount">
            <button id="place-bid-button" class="border border-slate-900 p-2.5">Place Bid</button>
            `}
          </div>
        </div>
    </div>
    `;const E=document.getElementById("listing-description");E.innerHTML+=`
        <div>${e.data.description}</div>
        `;const w=document.getElementById("listing-tags");w.innerHTML+=`
        <div>${e.data.tags}</div>
        `;const y=document.getElementById("listing-bid-history");e.data.bids.length>0?y.innerHTML=e.data.bids.map((n,c)=>`
                <li>
                    <span>${c+1}</span>
                    <span>${n.amount} credits</span>
                    <span>${n.created}</span>
                </li>
            `).join(""):y.innerHTML="<li>No bids have been placed yet.</li>";const I=document.getElementById("listing-about-seller");I.innerHTML+=`
        <div class="flex items-center">
            <img class="rounded-full w-10 h-10" src="${e.data.seller.avatar.url||"public/assets/images/missing-img.jpg"}" alt="${e.data.seller.avatar.alt||"User Avatar"}">
            <span>${e.data.seller.name}</span>
        </div>
        <div>${e.data.seller.bio||"No bio available."}</div>
        <form action="../../../../profile/index.html">
            <button class="">Visit Profile</button>
        </form>
        `,B(e.data.media),d||document.getElementById("place-bid-button").addEventListener("click",async()=>{const c=document.getElementById("bid-amount"),r=parseFloat(c.value);if(isNaN(r)||r<=0){alert("Pleace enter a valid bid amount.");return}if(r<=l){alert("Your bid must be higher than the current highest bid of ${highestBid} credits.");return}if(r>o){alert("You have not enough credits to place this bid.");return}console.log("Placing bid:",{listingId:t,bidAmount:r});try{const s=await P(t,r);alert("Bid placed successfully!"),console.log("bid response",s),location.reload()}catch(s){console.error(s),alert("Failed to place bid. Please try again.")}})}catch(e){console.error("Error displaying single listing:",e)}}export{C as d,N as g,j as r};
