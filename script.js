document.addEventListener("DOMContentLoaded", async function () {
    // Create a map object and set its center and zoom level
    const map = L.map('map').setView([36.2048, 138.2529], 5);

    // Create a tile layer
    const basemap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

    // Load earthquake data
    const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson");

    // Create a marker cluster group
    const earthquakeCluster = L.markerClusterGroup();
    earthquakeCluster.addTo(map);

    // Iterate through all earthquake features
    response.data.features.forEach((earthquake) => {
        // Get coordinates in the correct order (lat, lng)
        const coordinates = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]] ;

        // Create a marker for each earthquake
        const marker = L.marker(coordinates);

        // Add the earthquake marker to the cluster group
        marker.addTo(earthquakeCluster);
    });
});
