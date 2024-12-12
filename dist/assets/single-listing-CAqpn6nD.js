import{A as d,c as u}from"./constants-BDf8nfUD.js";import{g as p,r as h}from"./main-Cx0DgoeT.js";async function I(e=40,t=1,o="created",n="desc"){const a=new URLSearchParams({limit:e,page:t,_seller:!0,_bids:!0,sort:o,sortOrder:n}),c={method:"GET"},i=await fetch(`${d}?${a.toString()}`,c);if(console.log(`${d}?${a.toString()}`),!i.ok)throw new Error(`Error fetching data: ${i.status} ${i.statusText}`);const s=await i.json();return{listings:s.data||[],meta:s.meta||{}}}async function m(e){const t=await p(),o={method:"GET",headers:{"X-Noroff-API-Key":u,Authorization:`Bearer ${t}`,"Content-Type":"application/json"}},n=await fetch(`${d}/${e}?_bids=true&_seller=true`,o);if(!n.ok)throw console.error("Failed to fetch profile data:",n),new Error(`Error fetching profile data: ${n.status}`);const a=await n.json();return console.log(a),a}async function b(e,t){const o=await p(),n={method:"POST",headers:{"X-Noroff-API-Key":u,Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({amount:t})};console.log("Sending API request to:",`${d}/${e}/bids`,n);const a=await fetch(`${d}/${e}/bids`,n);if(!a.ok){const i=await a.text();throw console.error("Failed to place bid:",a.status,a.statusText,i),new Error(`Error placing bid: ${a.status}`)}return await a.json()}async function $(e){const t=new Date(e),o=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"}),n=t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${o} ${n}`}async function w(){const e=localStorage.getItem("loggedInUsername");if(!e)throw new Error("No logged-in user found");return(await h(e)).data.credits}async function y(e){return e.length===0?0:Math.max(...e.map(t=>t.amount))}async function A(){const e=localStorage.getItem("listingId");if(!e){console.error("no listing id found");return}try{const t=await m(e),o=await y(t.data.bids),n=await w(),a=document.getElementById("single-listing-container"),c=new Date,i=new Date(t.data.endsAt),s=c>i,g=await $(t.data.endsAt);a.innerHTML=`
    <img src="${t.data.media[0]?.url||"https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${t.data.media[0]?.alt||"image"}">
    <h1>${t.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Highest Bid</span>
            <span>${o} credits</span>
        </div>
        <div class="flex flex-col border border-slate-900 p-2">
        ${s?`
            <span>Ended</span>
            <span>${g}</span>
            `:`
            <span>Ends at</span>
            <span>${g}</span>
            `}
        </div>
    </div>
    <div>
        <div class="flex">
        ${s?'<div class="border border-red-600 text-red-600 p-2.5">This auction has ended.</div>':`
            <input id="bid-amount" class="border border-slate-900" type="text" min="${o+1}" placeholder="Enter bid amount">
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
    `,s||document.getElementById("place-bid-button").addEventListener("click",async()=>{const f=document.getElementById("bid-amount"),r=parseFloat(f.value);if(isNaN(r)||r<=0){alert("Pleace enter a valid bid amount.");return}if(r<=o){alert("Your bid must be higher than the current highest bid of ${highestBid} credits.");return}if(r>n){alert("You have not enough credits to place this bid.");return}console.log("Placing bid:",{listingId:e,bidAmount:r});try{const l=await b(e,r);alert("Bid placed successfully!"),console.log("bid response",l),location.reload()}catch(l){console.error(l),alert("Failed to place bid. Please try again.")}})}catch(t){alert("Failed to place bid. Please try again."),console.error("Error displaying single listing:",t)}}export{A as d,y as g,I as r};
