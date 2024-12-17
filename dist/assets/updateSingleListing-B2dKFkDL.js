import{c as u,A as g}from"./input-CCXIZeBy.js";import{g as m,a as p}from"./main-B8-7TrVe.js";import{h as b,t as f,g as x}from"./listings-B-nIuWtN.js";/* empty css               */async function h(t,e){try{const i=await m();if(!e)throw new Error("Could not find listing");const s={method:"PUT",headers:{"X-Noroff-API-Key":u,Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(t)},n=await fetch(`${g}/${e}`,s),r=await n.json();if(!n.ok)throw console.error("Full API Error Response:",r),new Error(r.errors?r.errors[0].message:"An error occurred.");return{data:r,ok:n.ok}}catch(i){throw console.error("Error in apiCreateListing:",i),i}}async function v(){try{const t=localStorage.getItem("loggedInUsername"),e=await p(t),i=document.getElementById("listings-container");i.innerHTML="",e.forEach(s=>{const n=document.createElement("li");n.classList.add("listingByUser"),n.setAttribute("data-id",s.id),n.innerHTML=y(s),i.appendChild(n)}),w(i)}catch(t){console.error("Error displaying user listings:",t),listingsContainer.innerHTML="<p>Failed to load listings. Please try again later.</p>"}}function y(t){const e=b(t.endsAt),i=f(t.endsAt),s=x(t)||"0";return`
<div class="flex flex-col gap-4 p-2.5 mb-6">
    <div class="flex justify-between">
        <div class="flex flex-col text-ui-black font-light gap-2">
            <span class="font-subtitle text-xl">${t.title}</span>
            ${e?`
            ´<span>Ended</span>
            `:`
            <div class="font-text text-sm">
                <span class="font-medium">Ends in:</span>
                <span>${i}</span>
            </div>
            `}
            <div class="font-text">
                <span class="font-medium text-sm">Bids:</span> 
                <span>${t.count?.bids||"0"}</span>
            </div>
            <div class="font-text">
                <span class="font-medium text-sm">Highest Bid:</span>
                <span>${s}</span>
            </div>
        </div>
        ${e?`
         <button class="delete-btn cursor-pointer bg-ui-black text-ui-white p-2 font-text font-light border border-transparent rounded-sm hover:border-ui-black hover:bg-ui-white hover:text-ui-black">Delete</button>
         `:`
        <div class="flex flex-col gap-4 justify-center align-middle font-text font-light">
            <button class="edit-btn cursor-pointer bg-ui-white text-ui-black p-2 border border-transparent rounded-sm hover:text-ui-white hover:bg-ui-black">Edit</button>
            <button class="delete-btn cursor-pointer bg-ui-black text-ui-white p-2 border border-transparent rounded-sm hover:border-ui-black hover:bg-ui-white hover:text-ui-black">Delete</button>
        </div>
        `}
        </div>
        <form class="edit-form hidden flex flex-col items-center" data-id="${t.id}">
        <div class="line-divider bg-primary-green my-6"></div>
         <div class="flex flex-col">
        <label class="font-text text-ui-black font-light mb-2" for="edit-title">Title</label>
        <input id="edit-title" value="${t.title}" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-title" type="text" required>
    </div>
    <div class="flex flex-col">
        <label class="font-text text-ui-black font-light mb-2" for="edit-description">Description</label>
        <input id="edit-description" value="${t.description||""}" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-description" type="text">
    </div>
    <div>
<div class="image-container">
                    ${t.media.map((n,r)=>`
                        <div class="image-input-set flex flex-col" data-index="${r}">
                        <div class="line-divider bg-ui-white my-4 w-full"></div>
                        <div class="flex items-center justify-between mb-2">
                            <label class="font-text text-ui-black font-light">Image URL</label>
                            <button class="remove-image-btn font-text font-light rounded-sm text-xs bg-primary-green p-1 items-center text-ui-white underline cursor-pointer hover:text-ui-black hover:bg-ui-white">Remove</button>
                        </div>
                        <input class="form-input font-text w-[280px] tablet:w-[480px] mb-4" value="${n.url}" name="edit-media-URL-${r}">
                        <label class="font-text text-ui-black font-light mb-2">Image Description</label>
                        <input class="form-input font-text w-[280px] tablet:w-[480px] mb-4" value="${n.alt}" name="edit-media-description-${r}">
                        </div>
                    `).join("")}
                </div>
    <span class="image-error-message font-text font-light text-notif-red hidden">You can only add 8 images to a listing.</span>
                <button id="add-image-btn" type="button" class="mb-6 bg-primary-green w-full p-2 font-light rounded-sm border border-transparent font-text text-ui-white hover:bg-ui-white hover:border-ui-black hover:text-ui-black">
                    + Add Another Image
                </button>
</div>

    <div class="flex flex-col">
        <label class="font-text text-ui-black font-light mb-2" for="edit-tags">Tags</label>
        <input id="edit-tags" value="${t.tags.join(", ")||""}" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-tags" type="text">
    </div>
    <button id="save-btn" type="submit" class="btn-primary">Save Changes</button>
        </form>
</div>
<div class="line-divider bg-primary-green"></div>
    `}function w(t){t.addEventListener("click",e=>{if(e.target.classList.contains("edit-btn")){const i=e.target.closest("li").querySelector("form");i.classList.toggle("hidden"),L(i)}else e.target.classList.contains("remove-image-btn")&&(e.target.closest(".image-input-set").remove(),o(t))}),t.addEventListener("submit",e=>{e.preventDefault(),e.target.classList.contains("edit-form")&&E(e.target)})}function L(t){const e=t.querySelector(".image-container"),i=t.querySelector("#add-image-btn");i.onclick=()=>k(e)}document.addEventListener("click",t=>{if(t.target.classList.contains("remove-image-btn")){const e=t.target.closest(".image-container");t.target.closest(".image-input-set").remove(),o(e)}});function o(t){const e=t.querySelectorAll(".image-input-set"),i=t.parentNode.querySelector(".image-error-message");e.length<8?(i.classList.add("hidden"),setTimeout(()=>{i.classList.add("hidden")},5e3)):i.classList.remove("hidden")}function k(t){const e=t.querySelectorAll(".image-input-set"),i=t.parentNode.querySelector(".image-error-message");if(e.length>=8){i.classList.remove("hidden"),setTimeout(()=>{i.classList.add("hidden")},5e3);return}const s=e.length;t.insertAdjacentHTML("beforeend",`
        <div class="image-input-set" data-index="${s}">
        <div class="flex items-center justify-between mb-2">
            <label class="font-text text-ui-black font-light">Image URL</label>
            <button class="remove-image-btn font-text font-light rounded-sm text-xs bg-primary-green p-1 items-center text-ui-white underline cursor-pointer hover:text-ui-black hover:bg-ui-white">Remove</button>
        </div>
            <input type="text" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-media-URL-${s}">
            <label class="font-text text-ui-black font-light">Image Description</label>
            <input type="text" class="form-input font-text w-[280px] tablet:w-[480px] mb-4" name="edit-media-description-${s}">
        </div>
    `),o(t)}async function E(t){const e=t.getAttribute("data-id"),i=t.querySelector('[name="edit-title"]').value,s=t.querySelector('[name="edit-description"]').value,n=t.querySelector('[name="edit-tags"]').value.split(",").map(a=>a.trim()),r=Array.from(t.querySelectorAll(".image-input-set")).map(a=>{const l=a.querySelector('input[name^="edit-media-URL-"]'),d=a.querySelector('input[name^="edit-media-description-"]');return{url:l?l.value:"",alt:d?d.value:""}});try{await h({title:i,description:s,tags:n,media:r},e),alert("Listing updated successfully!"),t.classList.add("hidden")}catch(a){console.error("Error updating listing:",a),alert("Failed to update the listing. Please try again.")}}async function A(t){const e=await m(),i={method:"DELETE",headers:{"X-Noroff-API-Key":u,Authorization:`Bearer ${e}`,"Content-Type":"application/json"}};try{const s=await fetch(`${g}/${t}`,i);if(!s.ok){const n=await s.json;throw new Error(n.errors?n.errors[0].message:"An error occurred while deleting the listing")}return{ok:s.ok}}catch(s){throw console.error("Error deleting listing:",s),s}}async function I(t){if(!t){console.error("No listing ID was found");return}if(confirm("Are you sure you want to delete this post?"))try{(await A(t)).ok?(alert("Listing successfully deleted!"),location.reload()):alert("Failed to delete listing.")}catch(e){console.error("Error deleting listing:",e),alert("An error occurred while deleting listing")}}v();const c=document.getElementById("listings-container");c?c.addEventListener("click",async t=>{if(t.target&&t.target.classList.contains("delete-btn")){const e=t.target.closest("li").getAttribute("data-id");try{await I(e)}catch(i){console.error("Error deleting listing:",i)}}}):console.error("Listings container not found");
