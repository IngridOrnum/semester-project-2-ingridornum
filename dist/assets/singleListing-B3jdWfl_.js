import"./constants-C6fMtq7-.js";import"./main-a4CFLtnG.js";import{a as s}from"./read-CVpjR93P.js";async function d(){const a=localStorage.getItem("listingId");if(!a){console.error("no listing id found");return}try{const t=await s(a),i=document.getElementById("single-listing-container");console.log(t.data),i.innerHTML=`
<img src="${t.data.media[0]?.url||""}" alt="${t.data.media[0]?.alt||"image"}">
    <h1>${t.data.title}</h1>
    <div class="flex">
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Bids</span>
            <span>${t.data._count?.bids}</span>
        </div>
        <div class="flex flex-col border border-slate-900 p-2">
            <span>Ends at</span>
            <span>${formatDatetime(t.data.endsAt)}</span>
        </div>
    </div>
   <div>
          <div class="flex">
            <input class="border border-slate-900" type="text">
            <label for="text"></label>
            <button class="border border-slate-900 p-2.5">Place Bid</button>
          </div>
          <div class="dropdown details">
            <div>
                <span>Details</span>
                <span>&#8595;</span>
            </div>
            <div>
                ${t.data.description}
            </div>
          </div>
          <div class="dropdown tags">
            <div>
                <span>Tags</span>
                <span>&#8595;</span>
            </div>
            <div>
                ${t.data.tags}
            </div>
          </div>
        </div>
    `}catch(t){console.error("Error displaying single listing:",t)}function e(t){const i=new Date(t),n=i.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"});return`${i.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})} ${n}`}e()}d();
