function u(t){const e=new Date,n=new Date(t)-e;if(n<=0)return"Auction ended";const i=Math.floor(n/(1e3*60*60*24)),r=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),s=Math.floor(n%(1e3*60*60)/(1e3*60));return i>0?`${i} days`:r>0?`${r} hours & ${s} minutes`:`${s} minutes`}function c(t){const e=new Date,o=new Date(t);return e>o}export{c as h,u as t};
