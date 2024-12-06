import{c as u,A as p}from"./constants-BDf8nfUD.js";import{g as b,r as m}from"./main-DhbMNFkw.js";import{a as f,f as h}from"./listings-CuzQzz7Q.js";async function v(e,t){const n=await b(),s={method:"POST",headers:{"X-Noroff-API-Key":u,Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({amount:t})};console.log("Sending API request to:",`${p}/${e}/bids`,s);const a=await fetch(`${p}/${e}/bids`,s);if(!a.ok){const o=await a.text();throw console.error("Failed to place bid:",a.status,a.statusText,o),new Error(`Error placing bid: ${a.status}`)}return await a.json()}async function y(){const e=localStorage.getItem("loggedInUsername");if(!e)throw new Error("No logged-in user found");return(await m(e)).data.credits}async function $(e){return e.length===0?0:Math.max(...e.map(t=>t.amount))}async function w(){const e=localStorage.getItem("listingId");if(!e){console.error("no listing id found");return}try{const t=await f(e),n=await $(t.data.bids),s=await y(),a=document.getElementById("single-listing-container"),l=new Date,o=new Date(t.data.endsAt),r=l>o,c=await h(t.data.endsAt);a.innerHTML=`
    <img src="${t.data.media[0]?.url||"https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${t.data.media[0]?.alt||"image"}">
    <h1>${t.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${n} credits</span>
        </div>
        <div class="flex flex-col border border-slate-900 p-2">
        ${r?`
            <span>Ended</span>
            <span>${c}</span>
            `:`
            <span>Ends at</span>
            <span>${c}</span>
            `}
        </div>
    </div>
    <div>
        <div class="flex">
        ${r?'<div class="border border-red-600 text-red-600 p-2.5">This auction has ended.</div>':`
            <input id="bid-amount" class="border border-slate-900" type="text" min="${n+1}" placeholder="Enter bid amount">
            <button id="place-bid-button" class="border border-slate-900 p-2.5">Place Bid</button>
            `}
          </div>
        <div>
            <span>Details</span>
            <div>${t.data.description}</div>
        </div>
        <div>
            <span>Tags</span>
            <div>${t.data.tags?.join(", ")}</div>
        </div>
    </div>
    `,r||document.getElementById("place-bid-button").addEventListener("click",async()=>{const g=document.getElementById("bid-amount"),i=parseFloat(g.value);if(isNaN(i)||i<=0){alert("Pleace enter a valid bid amount.");return}if(i<=n){alert("Your bid must be higher than the current highest bid of ${highestBid} credits.");return}if(i>s){alert("You have not enough credits to place this bid.");return}console.log("Placing bid:",{listingId:e,bidAmount:i});try{const d=await v(e,i);alert("Bid placed successfully!"),console.log("bid response",d),location.reload()}catch(d){console.error(d),alert("Failed to place bid. Please try again.")}})}catch(t){alert("Failed to place bid. Please try again."),console.error("Error displaying single listing:",t)}}w();
