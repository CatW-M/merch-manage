const locationData = JSON.parse(
  document.getElementById('map').dataset.location
);
 
const map = L.map('map').setView([31.111745, -118.113491], 5);
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
// const locationData = JSON.parse(
//   document.getElementById("map").dataset.location,
// );

// let map = L.map("map").setView([31.111745, -118.113491], 5);
// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

// const markerArray = [];

// const reversedArr = [locationData].reverse();

// const myIcon = L.icon({
//   iconUrl: "/../img/pin.png",
//   iconSize: [30, 35],
//   iconAnchor: [15, 35],
// });

// L.marker(reversedArr, { icon: myIcon }).addTo(map);
// markerArray.push(reversedArr);
// const bounds = L.latLngBounds(markerArray);
// map.fitBounds(bounds);

map.scrollWheelZoom.disable(); //to disable zoom by mouse wheel

// const locations = JSON.parse(document.getElementById("map").dataset.location);

// let map = L.map("map", { zoomControl: false }); //to disable + - zoom
// // var map = L.map('map', { zoomControl: false }).setView([31.111745, -118.113491], );

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   crossOrigin: "",
// }).addTo(map);

// const point = {};

//   L.marker(locations.coordinates)
//     .addTo(map)
//     .bindPopup(`<p>Day $${locations.description}</p>`, {
//       autoClose: false,
//     })
//     .openPopup();

// const bounds = L.latLngBounds(points).pad(0.5);
// map.fitBounds(bounds);

// map.scrollWheelZoom.disable(); //to disable zoom by mouse wheel
