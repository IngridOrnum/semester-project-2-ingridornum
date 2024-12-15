import{c as u,A as g}from"./constants-BDf8nfUD.js";import{g as p,a as m}from"./main-8ZS2Xavq.js";import{h as b,t as f,g as y}from"./listings-UwpdXMdd.js";/* empty css              *//* empty css               */async function h(e,t){try{const r=await p();if(!t)throw new Error("Could not find listing");const i={method:"PUT",headers:{"X-Noroff-API-Key":u,Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify(e)},s=await fetch(`${g}/${t}`,i),n=await s.json();if(!s.ok)throw console.error("Full API Error Response:",n),new Error(n.errors?n.errors[0].message:"An error occurred.");return{data:n,ok:s.ok}}catch(r){throw console.error("Error in apiCreateListing:",r),r}}async function v(){try{const e=localStorage.getItem("loggedInUsername"),t=await m(e),r=document.getElementById("listings-container");r.innerHTML="",t.forEach(i=>{const s=document.createElement("li");s.classList.add("listingByUser"),s.setAttribute("data-id",i.id),s.innerHTML=L(i),r.appendChild(s)}),E(r)}catch(e){console.error("Error displaying user listings:",e),listingsContainer.innerHTML="<p>Failed to load listings. Please try again later.</p>"}}function L(e){const t=b(e.endsAt),r=f(e.endsAt),i=y(e)||"0";return`
<div class="flex flex-col gap-4 border border-slate-900 p-2.5">
<div class="flex">
<div class="flex flex-col">
            <span>Title: ${e.title}</span>
            ${t?`
                <span>Ended</span>
                `:`
                <span>Ends at: ${r}</span>
                `}
            <span>Bids: ${e.count?.bids||"0"}</span>
            <span>Highest Bid: ${i}</span>
        </div>
        ${t?`
                    <button class="delete-btn border border-slate-900 cursor-pointer">Delete</button>
                `:`

                <div class="flex gap-4">
                    <button class="edit-btn border border-slate-900 cursor-pointer">Edit</button>
                    <button class="delete-btn border border-slate-900 cursor-pointer">Delete</button>
                </div>
                `}
        </div>
        <form class="edit-form hidden" data-id="${e.id}">
         <div class="flex flex-col">
        <label for="edit-title">Title</label>
        <input id="edit-title" value="${e.title}" class="border border-slate-900" name="edit-title" type="text" required>
    </div>
    <div class="flex flex-col">
        <label for="edit-description">Description</label>
        <input id="edit-description" value="${e.description||""}" class="border border-slate-900" name="edit-description" type="text">
    </div>
    <div>
<div class="image-container">
                    ${e.media.map((s,n)=>`
                        <div class="image-input-set" data-index="${n}">
                            <input class="border border-ui-black" value="${s.url}" name="edit-media-URL-${n}">
                            <input class="border border-ui-black" value="${s.alt}" name="edit-media-description-${n}">
                            <button class="remove-image-btn bg-primary-green text-ui-white">Remove</button>
                        </div>
                    `).join("")}
                </div>
    <span class="image-error-message font-text font-light text-notif-red hidden">You can only add 8 images to a listing.</span>
                <button id="add-image-btn" type="button" class="bg-primary-green w-full p-2 font-light rounded-sm border border-transparent font-text text-ui-white hover:bg-ui-white hover:border-ui-black hover:text-ui-black">
                    + Add Another Image
                </button>
</div>

    <div class="flex flex-col">
        <label for="edit-tags">Tags</label>
        <input id="edit-tags" value="${e.tags||""}" class="border border-slate-900" name="edit-tags" type="text">
    </div>
    <button id="save-btn" type="submit" class="border border-slate-900 p-2">Save Changes</button>
        </form>
</div>
    `}function E(e){e.addEventListener("click",t=>{if(t.target.classList.contains("edit-btn")){const r=t.target.closest("li").querySelector("form");r.classList.toggle("hidden"),w(r)}else t.target.classList.contains("remove-image-btn")&&(t.target.closest(".image-input-set").remove(),o(e))}),e.addEventListener("submit",t=>{t.preventDefault(),t.target.classList.contains("edit-form")&&$(t.target)})}function w(e){const t=e.querySelector(".image-container"),r=e.querySelector("#add-image-btn");r.onclick=()=>A(t)}document.addEventListener("click",e=>{if(e.target.classList.contains("remove-image-btn")){const t=e.target.closest(".image-container");e.target.closest(".image-input-set").remove(),o(t)}});function o(e){const t=e.querySelectorAll(".image-input-set"),r=e.parentNode.querySelector(".image-error-message");t.length<8?(r.classList.add("hidden"),setTimeout(()=>{r.classList.add("hidden")},5e3)):r.classList.remove("hidden")}function A(e){const t=e.querySelectorAll(".image-input-set"),r=e.parentNode.querySelector(".image-error-message");if(t.length>=8){r.classList.remove("hidden"),setTimeout(()=>{r.classList.add("hidden")},3e3);return}const i=t.length;e.insertAdjacentHTML("beforeend",`
        <div class="image-input-set" data-index="${i}">
            <button class="remove-image-btn bg-primary-green text-ui-white">Remove</button>
            <input type="text" class="border border-ui-black" name="edit-media-URL-${i}">
            <input type="text" class="border border-ui-black" name="edit-media-description-${i}">
        </div>
    `),o(e)}async function $(e){const t=e.getAttribute("data-id"),r=e.querySelector('[name="edit-title"]').value,i=e.querySelector('[name="edit-description"]').value,s=e.querySelector('[name="edit-tags"]').value.split(",").map(a=>a.trim()),n=Array.from(e.querySelectorAll(".image-input-set")).map(a=>{const d=a.querySelector('input[name^="edit-media-URL-"]'),l=a.querySelector('input[name^="edit-media-description-"]');return{url:d?d.value:"",alt:l?l.value:""}});try{await h({title:r,description:i,tags:s,media:n},t),alert("Listing updated successfully!"),e.classList.add("hidden")}catch(a){console.error("Error updating listing:",a),alert("Failed to update the listing. Please try again.")}}async function x(e){const t=await p(),r={method:"DELETE",headers:{"X-Noroff-API-Key":u,Authorization:`Bearer ${t}`,"Content-Type":"application/json"}};try{const i=await fetch(`${g}/${e}`,r);if(!i.ok){const s=await i.json;throw new Error(s.errors?s.errors[0].message:"An error occurred while deleting the listing")}return{ok:i.ok}}catch(i){throw console.error("Error deleting listing:",i),i}}async function I(e){if(!e){console.error("No listing ID was found");return}if(confirm("Are you sure you want to delete this post?"))try{(await x(e)).ok?(alert("Listing successfully deleted!"),location.reload()):alert("Failed to delete listing.")}catch(t){console.error("Error deleting listing:",t),alert("An error occurred while deleting listing")}}v();const c=document.getElementById("listings-container");c?c.addEventListener("click",async e=>{if(e.target&&e.target.classList.contains("delete-btn")){const t=e.target.closest("li").getAttribute("data-id");try{await I(t)}catch(r){console.error("Error deleting listing:",r)}}}):console.error("Listings container not found");
