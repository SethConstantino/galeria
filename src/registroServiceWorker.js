//registro del service worker
const container = document.querySelector(".container");
if("serviceWorker" in navigator){
    console.log("Si soporta...")
    window.addEventListener("load", function(){
        navigator.serviceWorker
            .register("/serviceWorker.js")
           .then(res=> console.log("Service worker registrado..."))
           .catch(err=>console.log("No se registo..."))
    })
} 