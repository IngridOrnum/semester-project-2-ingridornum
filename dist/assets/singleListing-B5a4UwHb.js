import{c as p,A as g}from"./constants-BDf8nfUD.js";import{g as m,r as b}from"./main-DhbMNFkw.js";import{a as f}from"./read-B4I6VCJF.js";async function h(e){const t=new Date(e),i=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"}),n=t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${i} ${n}`}async function v(e,t){const i=await m(),n={method:"POST",headers:{"X-Noroff-API-Key":p,Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({amount:t})};console.log("Sending API request to:",`${g}/${e}/bids`,n);const a=await fetch(`${g}/${e}/bids`,n);if(!a.ok){const s=await a.text();throw console.error("Failed to place bid:",a.status,a.statusText,s),new Error(`Error placing bid: ${a.status}`)}return await a.json()}async function y(){const e=localStorage.getItem("loggedInUsername");if(!e)throw new Error("No logged-in user found");return(await b(e)).data.credits}async function $(e){return e.length===0?0:Math.max(...e.map(t=>t.amount))}async function w(){const e=localStorage.getItem("listingId");if(!e){console.error("no listing id found");return}try{const t=await f(e),i=await $(t.data.bids),n=await y(),a=document.getElementById("single-listing-container"),c=new Date,s=new Date(t.data.endsAt),r=c>s,l=await h(t.data.endsAt);a.innerHTML=`
    <img src="${t.data.media[0]?.url||"https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${t.data.media[0]?.alt||"image"}">
    <h1>${t.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${i} credits</span>
        </div>
        <div class="flex flex-col border border-slate-900 p-2">
        ${r?`
            <span>Ended</span>
            <span>${l}</span>
            `:`
            <span>Ends at</span>
            <span>${l}</span>
            `}
        </div>
    </div>
    <div>
        <div class="flex">
        ${r?'<div class="border border-red-600 text-red-600 p-2.5">This auction has ended.</div>':`
            <input id="bid-amount" class="border border-slate-900" type="text" min="${i+1}" placeholder="Enter bid amount">
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
    `,r||document.getElementById("place-bid-button").addEventListener("click",async()=>{const u=document.getElementById("bid-amount"),o=parseFloat(u.value);if(isNaN(o)||o<=0){alert("Pleace enter a valid bid amount.");return}if(o<=i){alert("Your bid must be higher than the current highest bid of ${highestBid} credits.");return}if(o>n){alert("You have not enough credits to place this bid.");return}console.log("Placing bid:",{listingId:e,bidAmount:o});try{const d=await v(e,o);alert("Bid placed successfully!"),console.log("bid response",d),location.reload()}catch(d){console.error(d),alert("Failed to place bid. Please try again.")}})}catch(t){alert("Failed to place bid. Please try again."),console.error("Error displaying single listing:",t)}}w();
