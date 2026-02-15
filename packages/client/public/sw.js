//this — это ServiceWorkerGlobalScope

this.addEventListener("install", event => {
    console.log("install");
});

this.addEventListener("activate", event => {
    console.log("activate");
});