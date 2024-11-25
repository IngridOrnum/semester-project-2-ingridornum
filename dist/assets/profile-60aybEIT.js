import{b as p,e as f}from"./constants-C6fMtq7-.js";import{g as m,r as d}from"./main-DS7Q-29M.js";async function g(n,e){const t=await m(),a={method:"PUT",headers:{"X-Noroff-API-Key":p,Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify(e)},o=await fetch(`${f}/${n}`,a);if(!o.ok)throw console.error("Failed to update profile data:",o),new Error(`Error updating profile data: ${o.status}`);return await o.json()}async function l(){const n=localStorage.getItem("loggedInUsername"),e=await d(n),t=document.getElementById("user-profile-info");t&&(t.innerHTML=`
<span>Welcome, ${e.data.name}!</span>
<div class="flex gap-6">
<span>Credits: ${e.data.credits}</span>
<span>Listings: ${e.data.count?.listings||"No listings yet."}</span>
<span>Wins: ${e.data.count?.wins||"No wins yet."}</span>
</div>
<div>${e.data.bio}</div>
                `)}async function v(){const n=localStorage.getItem("loggedInUsername"),e=await d(n),t=document.getElementById("edit-profile-btn"),a=document.getElementById("update-profile-form"),o=document.getElementById("bio"),s=document.getElementById("avatar"),i=document.getElementById("banner-url");t.addEventListener("click",()=>{a.classList.add("block"),a.classList.remove("hidden"),t.classList.add("hidden"),t.classList.remove("block")}),o&&(o.value=e.data.bio||""),s&&(s.value=e.data.avatar?.url||""),i&&(i.value=e.data.banner?.url||""),a&&a.addEventListener("submit",async c=>{c.preventDefault();const u={bio:o.value,avatar:{url:s.value},banner:{url:i.value}};try{const r=await g(n,u);console.log("Profile updated successfully:",r),await l(),a.classList.add("hidden"),a.classList.remove("block"),t.classList.add("block"),t.classList.remove("hidden")}catch(r){console.error("Error updating profile:",r)}})}l();v();
