import"./constants-C6fMtq7-.js";import{r as a}from"./main-BMMlsC7B.js";async function r(){const o=localStorage.getItem("loggedInUsername"),e=await a(o),n=document.getElementById("user-profile-info");n&&(n.innerHTML=`
<span>Welcome, ${e.data.name}!</span>
<span>Your Credits: ${e.data.credits}</span>
                `)}r();
