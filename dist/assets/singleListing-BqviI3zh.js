import{b as p,A as c}from"./constants-C6fMtq7-.js";import{g as m,r as b}from"./main-a4CFLtnG.js";import{a as f}from"./read-BwVlJ9s-.js";async function h(e,t){const a=await m(),o={method:"POST",headers:{"X-Noroff-API-Key":p,Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({amount:t})};console.log("Sending API request to:",`${c}/${e}/bids`,o);const i=await fetch(`${c}/${e}/bids`,o);if(!i.ok){const s=await i.text();throw console.error("Failed to place bid:",i.status,i.statusText,s),new Error(`Error placing bid: ${i.status}`)}return await i.json()}function g(e){const t=new Date(e),a=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"});return`${t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})} ${a}`}async function v(){const e=localStorage.getItem("loggedInUsername");if(!e)throw new Error("No logged-in user found");return(await b(e)).data.credits}async function y(e){return e.length===0?0:Math.max(...e.map(t=>t.amount))}async function $(){const e=localStorage.getItem("listingId");if(!e){console.error("no listing id found");return}try{const t=await f(e),a=await y(t.data.bids),o=await v(),i=document.getElementById("single-listing-container");console.log(t.data),console.log("highest bid:",a);const l=new Date,s=new Date(t.data.endsAt),r=l>s;i.innerHTML=`
    <img src="${t.data.media[0]?.url||""}" alt="${t.data.media[0]?.alt||"image"}">
    <h1>${t.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${a} credits</span>
        </div>
        <div class="flex flex-col border border-slate-900 p-2">
        ${r?`
            <span>Ended</span>
            <span>${g(t.data.endsAt)}</span>
            `:`
            <span>Ends at</span>
            <span>${g(t.data.endsAt)}</span>
            `}
        </div>
    </div>
    <div>
        <div class="flex">
        ${r?'<div class="border border-red-600 text-red-600 p-2.5">This auction has ended.</div>':`
            <input id="bid-amount" class="border border-slate-900" type="text" min="${a+1}" placeholder="Enter bid amount">
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
    `,r||document.getElementById("place-bid-button").addEventListener("click",async()=>{const u=document.getElementById("bid-amount"),n=parseFloat(u.value);if(isNaN(n)||n<=0){alert("Pleace enter a valid bid amount.");return}if(n<=a){alert("Your bid must be higher than the current highest bid of ${highestBid} credits.");return}if(n>o){alert("You have not enough credits to place this bid.");return}console.log("Placing bid:",{listingId:e,bidAmount:n});try{const d=await h(e,n);alert("Bid placed successfully!"),console.log("bid response",d),location.reload()}catch(d){console.error(d),alert("Failed to place bid. Please try again.")}})}catch(t){alert("Failed to place bid. Please try again."),console.error("Error displaying single listing:",t)}}$();
