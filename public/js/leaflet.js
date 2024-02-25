const mapBox = document.getElementById("map");
 
const displayMap = (locationData) => {
  map = L.map('map').setView([31.111745, -118.113491], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
 
const markerArray = [];
  const reversedArr = [...locationData.coordinates].reverse();
 
  const myIcon = L.icon({
    iconUrl: './../img/pin.png',
    iconSize: [30, 35],
    iconAnchor: [15, 35],
  });
 
  L.marker(reversedArr, {icon: myIcon}).addTo(map);
  markerArray.push(reversedArr);
const bounds = L.latLngBounds(markerArray);
map.fitBounds(bounds);

map.scrollWheelZoom.disable()
}

if (mapBox) {
  const locationData = JSON.parse(mapBox.dataset.location);
  displayMap(locationData);
}