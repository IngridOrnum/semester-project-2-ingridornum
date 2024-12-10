import{A as w}from"./constants-BDf8nfUD.js";import"./main-DhbMNFkw.js";import{r as E,f as m}from"./listings-C1U1sMSb.js";async function L(e,n=24,t=0){const i=new URLSearchParams({q:e,limit:n,offset:t}),a=await fetch(`${w}/search?${i.toString()}`);if(!a.ok)throw new Error(`Error fetching search data: ${a.status}`);const r=await a.json();return{listings:r.data||[],meta:r.meta||{}}}let d="",o=0,l=24,p=[],y=[],c=!1;async function g(e=1,n=""){try{let t;n.trim()?t=await L(n,l,e):t=await E(l,e);const i=t.listings||[];y=t.meta||[],c=i.length<l,p=[...p,...i],u(i)}catch(t){console.error("Error displaying listings:",t),u([])}}async function u(e){const n=document.querySelector(".listings-container");if(e.length===0){n.innerHTML="<p>No listings found.</p>";return}for(const t of e){const i=new Date,a=new Date(t.endsAt),r=i>a,f=await m(t.endsAt),h=await m(t.created),s=document.createElement("li");s.classList.add("li-single-listing"),s.setAttribute("data-id",t.id),s.innerHTML=`
            <div class="li-single-listing-content border border-slate-900 p-2.5 flex flex-col">
                <img src="${t.media?.[0]?.url||"https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707867_pjpsqF5zUNMV1I2g8a3tQAYqinAxFkQp.jpg"}" alt="${t.media?.[0]?.alt||"No image"}">
                <span>${t.title}</span>
                <span>Created: ${h}</span>
                ${r?`
            <span class="uppercase text-red-800">Ended</span>
            `:`
            <span>Ends at</span>
            <span>${f}</span>
            `}

            </div>
        `,n.appendChild(s),s.addEventListener("click",()=>{localStorage.setItem("listingId",t.id),window.location.href="../../../../single-listing/index.html"})}}document.getElementById("searchInput").addEventListener("input",async e=>{d=e.target.value.trim(),o=1,await g(o,d)});document.getElementById("loadMore").addEventListener("click",async()=>{c||(o++,await g(o,d)),c&&(document.getElementById("loadMore").style.display="none")});document.getElementById("loginBtn").addEventListener("click",()=>{window.location="auth/login/index.html"});document.getElementById("registerBnt").addEventListener("click",()=>{window.location="auth/register/index.html"});g(1);
