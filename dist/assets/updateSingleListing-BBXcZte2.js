import{c as d,A as l}from"./constants-BDf8nfUD.js";import{g as c,a as g}from"./main-btKrpKiE.js";import{h as m,t as f}from"./listings-UwpdXMdd.js";/* empty css               */async function b(r,t){try{const i=await c();if(!t)throw new Error("Could not find listing");const s={method:"PUT",headers:{"X-Noroff-API-Key":d,Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(r)},e=await fetch(`${l}/${t}`,s),o=await e.json();if(!e.ok)throw console.error("Full API Error Response:",o),new Error(o.errors?o.errors[0].message:"An error occurred.");return{data:o,ok:e.ok}}catch(i){throw console.error("Error in apiCreateListing:",i),i}}async function y(){try{let s=function(e){document.querySelector(`form[data-id="${e}"]`).classList.toggle("hidden")};const r=localStorage.getItem("loggedInUsername"),t=await g(r),i=document.getElementById("listings-container");i.innerHTML="",t.forEach(e=>{const o=document.createElement("li"),a=m(e.endsAt),u=f(e.endsAt),p=e.highestBid||"No bids";o.classList.add("listingByUser"),o.setAttribute("data-id",e.id),o.innerHTML=`

<div class="flex flex-col gap-4 border border-slate-900 p-2.5">
<div class="flex">
<div class="flex flex-col">
            <span>Title: ${e.title}</span>
            ${a?`
                <span>Ended</span>
                `:`
                <span>Ends at: ${u}</span>
                `}
            <span>Bids: ${e.count?.bids||"0"}</span>
            <span>Highest Bid: ${p}</span>
        </div>
        ${a?`
                    <button class="delete-btn border border-slate-900 cursor-pointer">Delete</button>
                `:`
               
                <div class="flex gap-4">
                    <button class="edit-btn border border-slate-900 cursor-pointer">Edit</button>
                    <button class="delete-btn border border-slate-900 cursor-pointer">Delete</button>
                </div>
                `}
        </div>
        <form class="edit-form hidden" data-id="${e.id}">
         <div>
        <label for="edit-title">Title</label>
        <input id="edit-title" value="${e.title}" class="border border-slate-900" name="edit-title" type="text" required>
    </div>
    <div>
        <label for="edit-description">Description</label>
        <input id="edit-description" value="${e.description||""}" class="border border-slate-900" name="edit-description" type="text">
    </div>
    <div>
        <label for="edit-media-URL">Image URL</label>
        <input id="edit-media-URL" value="${e.media[0].url||""}" class="border border-slate-900" name="edit-media-URL" type="text">
    </div>
    <div>
        <label for="edit-media-description">Image Description</label>
        <input id="edit-media-description" value="${e.media[0].alt||""}" class="border border-slate-900" name="edit-media-description" type="text">
    </div>
    <div>
        <label for="edit-tags">Tags</label>
        <input id="edit-tags" value="${e.tags||""}" class="border border-slate-900" name="edit-tags" type="text">
    </div>
    <button id="save-btn" type="submit" class="border border-slate-900 p-2">Save Changes</button>
        </form>
</div>
      `,i.appendChild(o)}),i.addEventListener("click",e=>{if(e.target.classList.contains("edit-btn")){const o=e.target.closest("li").getAttribute("data-id");s(o)}}),i.addEventListener("submit",e=>{e.target.classList.contains("edit-form")&&h(e)})}catch(r){console.error("Error displaying user listings:",r),listingsContainer.innerHTML="<p>Failed to load listings. Please try again later.</p>"}}async function h(r){r.preventDefault();const t=r.target.closest("form"),i=t.getAttribute("data-id"),s=t.querySelector("#edit-media-URL").value.trim(),e=t.querySelector("#edit-media-description").value.trim(),o={title:t.querySelector("#edit-title").value.trim(),description:t.querySelector("#edit-description").value.trim()||void 0,tags:t.querySelector("#edit-tags").value.split(",").map(a=>a.trim()),media:s?[{url:s,alt:e}]:void 0};try{await b(o,i),alert("Listing updated successfully!"),t.classList.add("hidden")}catch(a){console.error("Error updating listing:",a),alert("Failed to update the listing. Please try again.")}}async function L(r){const t=await c(),i={method:"DELETE",headers:{"X-Noroff-API-Key":d,Authorization:`Bearer ${t}`,"Content-Type":"application/json"}};try{const s=await fetch(`${l}/${r}`,i);if(!s.ok){const e=await s.json;throw new Error(e.errors?e.errors[0].message:"An error occurred while deleting the listing")}return{ok:s.ok}}catch(s){throw console.error("Error deleting listing:",s),s}}async function v(r){if(!r){console.error("No listing ID was found");return}if(confirm("Are you sure you want to delete this post?"))try{(await L(r)).ok?(alert("Listing successfully deleted!"),location.reload()):alert("Failed to delete listing.")}catch(t){console.error("Error deleting listing:",t),alert("An error occurred while deleting listing")}}y();const n=document.getElementById("listings-container");n?n.addEventListener("click",async r=>{if(r.target&&r.target.classList.contains("delete-btn")){const t=r.target.closest("li").getAttribute("data-id");try{await v(t)}catch(i){console.error("Error deleting listing:",i)}}}):console.error("Listings container not found");
