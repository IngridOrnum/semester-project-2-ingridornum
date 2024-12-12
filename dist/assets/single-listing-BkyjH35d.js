import{A as l,c as g}from"./constants-BDf8nfUD.js";import{g as u,r as m}from"./main-Cx0DgoeT.js";async function I(e=40,t=1,o="latest",a="",n="all"){const i=new URLSearchParams({limit:e,page:t,_seller:!0,_bids:!0});o==="latest"?(i.append("sort","created"),i.append("sortOrder","desc")):o==="a-z"&&(i.append("sort","title"),i.append("sortOrder","asc")),n==="active"&&i.append("_active","true"),a&&i.append("q",a);const c={method:"GET"},s=await fetch(`${l}?${i.toString()}`,c);if(console.log(`${l}?${i.toString()}`),!s.ok)throw new Error(`Error fetching data: ${s.status} ${s.statusText}`);const r=await s.json();return console.log("API Response in listings:",r),{listings:r.data||[],meta:r.meta||{}}}async function h(e){const t=await u(),o={method:"GET",headers:{"X-Noroff-API-Key":g,Authorization:`Bearer ${t}`,"Content-Type":"application/json"}},a=await fetch(`${l}/${e}?_bids=true&_seller=true`,o);if(!a.ok)throw console.error("Failed to fetch profile data:",a),new Error(`Error fetching profile data: ${a.status}`);const n=await a.json();return console.log(n),n}async function b(e,t){const o=await u(),a={method:"POST",headers:{"X-Noroff-API-Key":g,Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({amount:t})};console.log("Sending API request to:",`${l}/${e}/bids`,a);const n=await fetch(`${l}/${e}/bids`,a);if(!n.ok){const c=await n.text();throw console.error("Failed to place bid:",n.status,n.statusText,c),new Error(`Error placing bid: ${n.status}`)}return await n.json()}async function $(e){const t=new Date(e),o=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"}),a=t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${o} ${a}`}async function w(){const e=localStorage.getItem("loggedInUsername");if(!e)throw new Error("No logged-in user found");return(await m(e)).data.credits}async function v(e){return!e||!e.length?(console.log("No bids found."),"No bids"):Math.max(...e.map(t=>t.amount))}async function A(){const e=localStorage.getItem("listingId");if(!e){console.error("no listing id found");return}try{const t=await h(e),o=await v(t.data.bids),a=await w(),n=document.getElementById("single-listing-container"),i=new Date,c=new Date(t.data.endsAt),s=i>c,r=await $(t.data.endsAt);n.innerHTML=`
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
            <span>${r}</span>
            `:`
            <span>Ends at</span>
            <span>${r}</span>
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
    `,s||document.getElementById("place-bid-button").addEventListener("click",async()=>{const f=document.getElementById("bid-amount"),d=parseFloat(f.value);if(isNaN(d)||d<=0){alert("Pleace enter a valid bid amount.");return}if(d<=o){alert("Your bid must be higher than the current highest bid of ${highestBid} credits.");return}if(d>a){alert("You have not enough credits to place this bid.");return}console.log("Placing bid:",{listingId:e,bidAmount:d});try{const p=await b(e,d);alert("Bid placed successfully!"),console.log("bid response",p),location.reload()}catch(p){console.error(p),alert("Failed to place bid. Please try again.")}})}catch(t){alert("Failed to place bid. Please try again."),console.error("Error displaying single listing:",t)}}export{A as d,v as g,I as r};
