import{b as u,e as p}from"./constants-C6fMtq7-.js";import{g as f,r as i}from"./main-DS7Q-29M.js";async function g(n,e){const t=await f(),o={method:"PUT",headers:{"X-Noroff-API-Key":u,Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify(e)},a=await fetch(`${p}/${n}`,o);if(!a.ok)throw console.error("Failed to update profile data:",a),new Error(`Error updating profile data: ${a.status}`);return await a.json()}async function d(){const n=localStorage.getItem("loggedInUsername"),e=await i(n),t=document.getElementById("user-profile-info");t&&(t.innerHTML=`
<span>Welcome, ${e.data.name}!</span>
<div class="flex gap-6">
<span>Credits: ${e.data.credits}</span>
<span>Listings: ${e.data.count?.listings||"No listings yet."}</span>
<span>Wins: ${e.data.count?.wins||"No wins yet."}</span>
</div>
<div>${e.data.bio}</div>
                `)}async function m(){const n=localStorage.getItem("loggedInUsername"),e=await i(n),t=document.getElementById("update-profile-form"),o=document.getElementById("bio"),a=document.getElementById("avatar"),r=document.getElementById("banner-url");document.getElementById("save-changes-btn"),o&&(o.value=e.data.bio||""),a&&(a.value=e.data.avatar?.url||""),r&&(r.value=e.data.banner?.url||""),t&&t.addEventListener("submit",async l=>{l.preventDefault();const c={bio:o.value,avatar:{url:a.value},banner:{url:r.value}};try{const s=await g(n,c);console.log("Profile updated successfully:",s),await d()}catch(s){console.error("Error updating profile:",s)}})}d();m();
