import {createCardElement} from './card.js';
// import {activatePage, deactivatePage } from './form.js';
// deactivatePage();

const OFFERS_COUNT = 10;
const MAIN_AD_PIN_ICON_URL = 'img/main-pin.svg';
const MAIN_PIN_ICON_SIZE = 52;
const AD_PIN_ICON_URL = 'img/pin.svg';
const AD_PIN_ICON_SIZE = 40;

const startCoordinate = {
  lat: 35.66023,
  lng: 139.73007,
};

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_AD_PIN_ICON_URL,
  iconSize: [MAIN_PIN_ICON_SIZE, MAIN_PIN_ICON_SIZE],
  iconAnchor: [MAIN_PIN_ICON_SIZE / 2, MAIN_PIN_ICON_SIZE],
});

const adPinIcon = L.icon({
  iconUrl: AD_PIN_ICON_URL,
  iconSize: [AD_PIN_ICON_SIZE, AD_PIN_ICON_SIZE],
  iconAnchor: [AD_PIN_ICON_SIZE / 2, AD_PIN_ICON_SIZE],
});

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = (coordinate) => {
  map.setView(coordinate, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.setLatLng(coordinate);
  mainPinMarker.addTo(map);
};

const createAdPinMarkers = (offers) => {
  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: adPinIcon,
      }
    );

    marker.addTo(markerGroup).bindPopup(createCardElement(offer));
  });
};

const setAdPins = (offers) => {
  markerGroup.clearLayers();
  createAdPinMarkers(offers.slice(0, OFFERS_COUNT));
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const setOnMainPinMove = (cb) => {
  mainPinMarker.on('moveend', (evt) => cb(evt.target.getLatLng()));
};

const resetMainMark = () => mainPinMarker.setLatLng(startCoordinate);

export {initMap, setOnMapLoad, setOnMainPinMove, setAdPins, startCoordinate, resetMainMark};
