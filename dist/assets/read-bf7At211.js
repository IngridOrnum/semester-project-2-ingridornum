import{A as c,c as l}from"./constants-BDf8nfUD.js";import{g as d}from"./main-B4YcYq6j.js";async function h(r=40,n=1,a="latest",e="",o="all"){const t=new URLSearchParams({limit:r,page:n,_seller:!0,_bids:!0});a==="latest"?(t.append("sort","created"),t.append("sortOrder","desc")):a==="a-z"&&(t.append("sort","title"),t.append("sortOrder","asc")),o==="active"&&t.append("_active","true"),e&&t.append("q",e);const p={method:"GET",headers:{"Content-Type":"application/json"}},s=await fetch(`${c}?${t.toString()}`,p);if(console.log(`${c}?${t.toString()}`),!s.ok)throw new Error(`Error fetching data: ${s.status} ${s.statusText}`);const i=await s.json();return console.log("API Response in listings:",i),{listings:i.data||[],meta:i.meta||{}}}async function u(r){const n=await d(),a={method:"GET",headers:{"X-Noroff-API-Key":l,Authorization:`Bearer ${n}`,"Content-Type":"application/json"}},e=await fetch(`${c}/${r}?_bids=true&_seller=true`,a);if(!e.ok)throw console.error("Failed to fetch profile data:",e),new Error(`Error fetching profile data: ${e.status}`);const o=await e.json();return console.log(o),o}export{u as a,h as r};
