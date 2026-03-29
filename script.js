let finalURL="";

async function resolve(){
let url=document.getElementById("input").value;
document.getElementById("status").innerText="Resolving...";
let res=await fetch("/resolve?url="+encodeURIComponent(url));
let data=await res.json();
finalURL=data.url.replace(/flipkart.com/gi,"shopsy.in");
document.getElementById("output").value=finalURL;
document.getElementById("status").innerText="Done";
}

function copy(){
let text=document.getElementById("output");
text.select();
document.execCommand("copy");
}

function openLink(){
window.open(finalURL,"_blank");
}

function clearAll(){
document.getElementById("input").value="";
document.getElementById("output").value="";
document.getElementById("status").innerText="";
}
