import{A as s,c as d}from"./constants-BDf8nfUD.js";import{g as f}from"./main-DhbMNFkw.js";async function m(o=40,e=1,r="created",t="desc"){const a=new URLSearchParams({limit:o,page:e,_seller:!0,_bids:!0,sort:r,sortOrder:t}),c={method:"GET"},n=await fetch(`${s}?${a.toString()}`,c);if(console.log(`${s}?${a.toString()}`),!n.ok)throw new Error(`Error fetching data: ${n.status} ${n.statusText}`);const i=await n.json();return{listings:i.data||[],meta:i.meta||{}}}async function u(o){const e=await f(),r={method:"GET",headers:{"X-Noroff-API-Key":d,Authorization:`Bearer ${e}`,"Content-Type":"application/json"}},t=await fetch(`${s}/${o}?_bids=true&_seller=true`,r);if(!t.ok)throw console.error("Failed to fetch profile data:",t),new Error(`Error fetching profile data: ${t.status}`);const a=await t.json();return console.log(a),a}async function h(o){const e=new Date(o),r=e.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"}),t=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});return`${r} ${t}`}export{u as a,h as f,m as r};