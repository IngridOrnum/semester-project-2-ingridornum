function a(n){const t=new Date,e=new Date(n)-t;if(e<=0)return"Auction ended";const i=Math.floor(e/(1e3*60*60*24)),r=Math.floor(e%(1e3*60*60*24)/(1e3*60*60)),u=Math.floor(e%(1e3*60*60)/(1e3*60));return i>0?`${i} days`:r>0?`${r} hours & ${u} minutes`:`${u} minutes`}function s(n){const t=new Date,o=new Date(n);return t>o}function c(n){return!n||!n.length?"0":Math.max(...n.map(t=>t.amount))}export{c as g,s as h,a as t};
