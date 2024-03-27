var map = L.map('map').setView([51.0447, -114.0719], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var drawnPolyline = null;


map.on('click', function(e) {
    if (!drawnPolyline) {
        drawnPolyline = L.polyline([e.latlng], {color: 'red'}).addTo(map);
    } else {
        drawnPolyline.addLatLng(e.latlng);
    }
});

document.getElementById('simplifyPolyline').addEventListener('click', function() {
    if (drawnPolyline) {
        var simplified = turf.simplify(drawnPolyline.toGeoJSON(), { tolerance: 0.01, highQuality: false });
        map.removeLayer(drawnPolyline);
        drawnPolyline = L.geoJSON(simplified, {
            style: {
                color: 'red'
            }
        }).addTo(map);
    }
});

document.getElementById('removePolyline').addEventListener('click', function() {
    if (drawnPolyline) {
        map.removeLayer(drawnPolyline);
        drawnPolyline = null;
    }
});