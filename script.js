(function(){

    // Davis Leaflet Map
    var map = L.map('map').setView([38.544087, -121.743363],17);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);  
})();