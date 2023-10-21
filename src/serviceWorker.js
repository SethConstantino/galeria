// const container = document.querySelector(".container")

const staticGaleria="dev-galeria-site-v1"

const assets = [
    "./",
    
]
    

//<!--<img class="card-avatar" src=${image} />-->
async function preCache() {
    const cache = await caches.open(staticGaleria);

    return cache.addAll(assets);
}

self.addEventListener("install", (installEvent)=>{
    installEvent.waitUntil(
        preCache()
    );
})

async function cacheFirst(request){
    const cacheResponse = await caches.match(request);

    if(cacheResponse){
        return cacheResponse;
    }
     try{
        const networkResponse = await fetch(request);
        if(networkResponse.ok){
            const cache = await caches.open(staticGaleria);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
     }
     catch(error){
        return Response.error
     }
}



self.addEventListener("fetch", fetchEvent=>{
    fetchEvent.respondWith(
        cacheFirst(fetchEvent.request)
        )
})

// const showCars =() => {
//     let output =""

//     cars.forEach(
//         ( {name, image} ) => 
//             (output += `
//                 <div class="card">
//                     <img class="card-avatar" src=${image} loading="lazy" />
//                     <h1 class="card-title"> ${name}</h1>
//                 </div>
            
//             `)
//     )

//     container.innerHTML = output
// }

// document.addEventListener("DOMContentLoaded", showCars)


