let finalURL="";

document.getElementById("input").addEventListener("input", resolve);

async function resolve(){

let url=document.getElementById("input").value;

if(!url) return;

document.getElementById("status").innerText="Resolving...";

let res=await fetch("/resolve?url="+encodeURIComponent(url));

let data=await res.json();

finalURL=data.url.replace(/flipkart.com/gi,"shopsy.in");

document.getElementById("output").value=finalURL;

document.getElementById("status").innerText="Done";

}
