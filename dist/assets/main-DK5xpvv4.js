import{A as u}from"./constants-BDf8nfUD.js";import"./main-DhbMNFkw.js";import{r as p}from"./read-Ca4iJX9W.js";async function h(n,i=24,t=0){const e=new URLSearchParams({q:n,limit:i,offset:t}),s=await fetch(`${u}/search?${e.toString()}`);if(!s.ok)throw new Error(`Error fetching search data: ${s.status}`);const a=await s.json();return{listings:a.data||[],meta:a.meta||{}}}const l=24;let d="",r=[],o=0,m=!1;async function c(n=1,i=""){try{let t;i.trim()?t=await h(i,l,(n-1)*l):t=await p(l,n);const e=t.listings||[],s=t.meta||{};o=s.currentPage||1,m=s.isLastPage||!1,n===1?r=e:r=[...r,...e],g(r);const a=document.getElementById("loadMore");e.length<l?a.style.display="none":a.style.display="block"}catch(t){console.error("Error displaying listings:",t),g([])}}async function g(n){console.log("listings to display:",n);const i=document.querySelector(".listings-container");if(i.innerHTML="",n.length===0){i.innerHTML="<p>No listings found.</p>";return}n.forEach(t=>{const e=document.createElement("li");e.classList.add("li-single-listing"),e.setAttribute("data-id",t.id),e.innerHTML=`
            <div class="li-single-listing-content">
                <img src="${t.media?.[0]?.url||"https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                <span>${t.title}</span>
            </div>
        `,i.appendChild(e)}),document.querySelectorAll(".li-single-listing").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-id");localStorage.setItem("listingId",e),window.location.href="../../../../single-listing/index.html"})})}document.getElementById("searchInput").addEventListener("input",async n=>{d=n.target.value,o=1,await c(o,d)});document.getElementById("loadMore").addEventListener("click",async()=>{m||await c(o+1)});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});c(1);
